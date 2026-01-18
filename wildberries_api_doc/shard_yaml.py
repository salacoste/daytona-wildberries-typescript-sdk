#!/usr/bin/env python3
"""
API Documentation Sharding Script
Shards large OpenAPI YAML files into smaller, domain-organized modules.
"""

import yaml
import os
import re
from pathlib import Path
from typing import Dict, List, Any, Tuple
from collections import defaultdict


class YAMLSharder:
    """Shards large OpenAPI YAML files into smaller modules."""

    def __init__(self, base_dir: str):
        self.base_dir = Path(base_dir)
        self.original_dir = self.base_dir / "original"
        self.original_dir.mkdir(exist_ok=True)

    def backup_original(self, filename: str) -> Path:
        """Backup original file to original/ directory."""
        src = self.base_dir / filename
        dst = self.original_dir / filename
        if not dst.exists():
            import shutil
            shutil.copy2(src, dst)
            print(f"✓ Backed up: {filename}")
        return dst

    def load_yaml(self, filepath: Path) -> Dict[str, Any]:
        """Load YAML file with proper encoding."""
        with open(filepath, 'r', encoding='utf-8') as f:
            return yaml.safe_load(f)

    def save_yaml(self, data: Dict[str, Any], filepath: Path) -> None:
        """Save data to YAML file with proper formatting."""
        with open(filepath, 'w', encoding='utf-8') as f:
            yaml.dump(data, f, allow_unicode=True, default_flow_style=False, sort_keys=False)
        print(f"✓ Created: {filepath.relative_to(self.base_dir)}")

    def count_lines(self, filepath: Path) -> int:
        """Count lines in a file."""
        with open(filepath, 'r', encoding='utf-8') as f:
            return sum(1 for _ in f)

    def group_endpoints_by_tag(self, spec: Dict[str, Any]) -> Dict[str, List[Dict]]:
        """Group endpoints by their primary tag."""
        tags_map = defaultdict(list)

        for path, path_spec in spec.get('paths', {}).items():
            for method, method_spec in path_spec.items():
                if method.lower() in ['get', 'post', 'put', 'delete', 'patch']:
                    tags = method_spec.get('tags', [])
                    if tags:
                        primary_tag = tags[0]
                        tags_map[primary_tag].append({
                            'path': path,
                            'method': method,
                            'spec': method_spec,
                            'servers': path_spec.get('servers', spec.get('servers', []))
                        })

        return dict(tags_map)

    def extract_schemas_for_endpoints(self, endpoints: List[Dict], all_schemas: Dict) -> Dict[str, Any]:
        """Extract schemas referenced by endpoints."""
        referenced_schemas = {}

        def extract_refs(obj, depth=0):
            """Recursively extract $ref values."""
            if depth > 20:  # Prevent infinite recursion
                return
            if isinstance(obj, dict):
                if '$ref' in obj:
                    ref = obj['$ref']
                    if ref.startswith('#/components/schemas/'):
                        schema_name = ref.split('/')[-1]
                        if schema_name in all_schemas and schema_name not in referenced_schemas:
                            referenced_schemas[schema_name] = all_schemas[schema_name]
                            # Recursively find nested refs
                            extract_refs(all_schemas[schema_name], depth + 1)
                for v in obj.values():
                    extract_refs(v, depth + 1)
            elif isinstance(obj, list):
                for item in obj:
                    extract_refs(item, depth + 1)

        for endpoint in endpoints:
            extract_refs(endpoint['spec'])

        return referenced_schemas

    def create_shard(self, module_name: str, domain_name: str, endpoints: List[Dict],
                     base_spec: Dict[str, Any], schemas: Dict[str, Any],
                     shard_dir: Path) -> Path:
        """Create a single shard file."""
        # Build shard specification
        shard_spec = {
            'openapi': base_spec.get('openapi', '3.0.1'),
            'info': {
                'title': f"{module_name} - {domain_name}",
                'description': f"Extracted from original file for agent processing",
                'version': "1.0.0-shard"
            },
            'servers': endpoints[0]['servers'] if endpoints and endpoints[0]['servers'] else base_spec.get('servers', []),
            'tags': [{
                'name': domain_name,
                'description': f"{domain_name} endpoints"
            }],
            'paths': {},
            'components': {}
        }

        # Add endpoints
        for endpoint in endpoints:
            path = endpoint['path']
            method = endpoint['method']

            if path not in shard_spec['paths']:
                shard_spec['paths'][path] = {}

            shard_spec['paths'][path][method] = endpoint['spec']

        # Add schemas
        if schemas:
            shard_spec['components']['schemas'] = schemas

        # Generate filename
        safe_name = re.sub(r'[^\w\-]', '-', domain_name.lower()).strip('-')
        shard_file = shard_dir / f"{safe_name}.yaml"

        self.save_yaml(shard_spec, shard_file)
        return shard_file

    def create_index(self, module_name: str, shards: List[Dict], base_spec: Dict[str, Any],
                     index_dir: Path, original_file: str) -> Path:
        """Create index file for a module."""
        index_data = {
            '_module': module_name,
            '_description': base_spec.get('info', {}).get('description', ''),
            '_original_file': original_file,
            '_base_url': base_spec.get('servers', [{}])[0].get('url', 'N/A'),
            '_shards': shards,
            '_shared_schemas': '_schemas.yaml',
            '_total_endpoints': sum(s['endpoints'] for s in shards)
        }

        index_file = index_dir / '_index.yaml'
        self.save_yaml(index_data, index_file)
        return index_file

    def shard_file(self, filename: str, shard_domains: Dict[str, str]) -> bool:
        """Shard a single YAML file by domains."""
        print(f"\n{'='*60}")
        print(f"Sharding: {filename}")
        print(f"{'='*60}")

        # Backup original
        self.backup_original(filename)

        # Load original spec
        filepath = self.base_dir / filename
        spec = self.load_yaml(filepath)

        # Create module directory
        module_name = filename.replace('.yaml', '')
        module_dir = self.base_dir / module_name
        module_dir.mkdir(exist_ok=True)

        # Group endpoints by tag
        tags_map = self.group_endpoints_by_tag(spec)

        # Extract all schemas
        all_schemas = spec.get('components', {}).get('schemas', {})

        # Create shards for each domain
        shards_info = []
        shard_files = []

        for domain_name, domain_en in shard_domains.items():
            if domain_name not in tags_map:
                print(f"⚠ Warning: Domain '{domain_name}' not found in tags")
                continue

            endpoints = tags_map[domain_name]
            schemas = self.extract_schemas_for_endpoints(endpoints, all_schemas)

            shard_file = self.create_shard(
                module_name,
                domain_name,
                endpoints,
                spec,
                schemas,
                module_dir
            )

            line_count = self.count_lines(shard_file)
            print(f"  → {domain_name}: {len(endpoints)} endpoints, {line_count} lines")

            shards_info.append({
                'file': shard_file.name,
                'domain': domain_name,
                'endpoints': len(endpoints),
                'description': domain_en
            })
            shard_files.append(shard_file)

        # Create shared schemas file
        shared_schemas = {}
        for schema_name, schema_data in all_schemas.items():
            if schema_name not in set().union(*[
                self.extract_schemas_for_endpoints(tags_map[tag], all_schemas).keys()
                for tag in tags_map.keys()
            ]):
                shared_schemas[schema_name] = schema_data

        if shared_schemas:
            schemas_file = module_dir / '_schemas.yaml'
            self.save_yaml({'components': {'schemas': shared_schemas}}, schemas_file)
            print(f"✓ Created: {schemas_file.relative_to(self.base_dir)} ({len(shared_schemas)} schemas)")

        # Create index file
        self.create_index(module_name, shards_info, spec, module_dir, filename)
        print(f"\n✓ Total: {sum(s['endpoints'] for s in shards_info)} endpoints across {len(shards_info)} shards")

        # Validate shard sizes
        oversized = [sf for sf in shard_files if self.count_lines(sf) > 1000]
        if oversized:
            print(f"\n⚠ Warning: {len(oversized)} shards exceed 1000 lines:")
            for sf in oversized:
                print(f"  - {sf.name}: {self.count_lines(sf)} lines")
            return False

        return True


def main():
    """Main execution."""
    base_dir = "/Users/r2d2/Documents/Code_Projects/wb_daytona_sdk/wildberries_api_doc"
    sharder = YAMLSharder(base_dir)

    # Define sharding configuration for each large file
    sharding_config = {
        '02-products.yaml': {
            'Категории, предметы и характеристики': 'Categories and Characteristics',
            'Создание карточек товаров': 'Product Card Creation',
            'Карточки товаров': 'Product Cards',
            'Медиафайлы': 'Media Files',
            'Ярлыки': 'Labels',
            'Цены и скидки': 'Prices and Discounts',
            'Склады продавца': 'Seller Warehouses',
            'Остатки на складах продавца': 'Warehouse Stock'
        },
        '08-promotion.yaml': {
            'Кампании': 'Campaigns',
            'Создание кампаний': 'Campaign Creation',
            'Управление кампаниями': 'Campaign Management',
            'Параметры кампаний': 'Campaign Parameters',
            'Финансы': 'Finances',
            'Медиа': 'Media',
            'Статистика': 'Statistics',
            'Календарь акций': 'Promotion Calendar'
        },
        '11-analytics.yaml': {
            'Воронка продаж': 'Sales Funnel',
            'Поисковые запросы': 'Search Queries',
            'История остатков': 'Stock History',
            'Аналитика продавца CSV': 'Seller Analytics CSV'
        },
        '09-communications.yaml': {
            'Вопросы': 'Questions',
            'Отзывы': 'Reviews',
            'Шаблоны ответов': 'Response Templates',
            'Чат с покупателями': 'Customer Chat',
            'Возвраты покупателями': 'Customer Returns'
        },
        '12-reports.yaml': {
            'Основные отчёты': 'Main Reports',
            'Отчёт об остатках на складах': 'Warehouse Stock Reports',
            'Отчёт о товарах c обязательной маркировкой': 'Marked Goods Reports',
            'Отчёты об удержаниях': 'Deduction Reports',
            'Платная приёмка': 'Paid Receiving',
            'Платное хранение': 'Paid Storage',
            'Продажи по регионам': 'Regional Sales',
            'Доля бренда в продажах': 'Brand Share',
            'Скрытые товары': 'Hidden Items',
            'Отчёт о возвратах и перемещении товаров': 'Returns and Movement Reports'
        },
        '03-orders-fbs.yaml': {
            'Сборочные задания FBS': 'FBS Assembly Tasks',
            'Метаданные FBS': 'FBS Metadata',
            'Поставки FBS': 'FBS Supplies',
            'Пропуска FBS': 'FBS Passes'
        }
    }

    results = {}

    for filename, domains in sharding_config.items():
        try:
            success = sharder.shard_file(filename, domains)
            results[filename] = '✓ Success' if success else '⚠ Partial (oversized shards)'
        except Exception as e:
            print(f"\n✗ Error sharding {filename}: {e}")
            import traceback
            traceback.print_exc()
            results[filename] = f'✗ Failed: {e}'

    print(f"\n{'='*60}")
    print("SHARDING SUMMARY")
    print(f"{'='*60}")
    for filename, result in results.items():
        print(f"{filename}: {result}")

    print(f"\n✓ Original files backed up to: original/")
    print(f"✓ Sharded modules created in respective directories")


if __name__ == '__main__':
    main()
