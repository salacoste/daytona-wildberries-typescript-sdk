// Temporary file to hold return processing types

/**
 * Return status for tracking return request lifecycle
 */
export type ReturnStatus =
  | 'created'           // Created and waiting for processing
  | 'processing'       // Currently being processed
  | 'canceled'         // Canceled by customer
  | 'delivered'        // Delivered to customer
  | 'refunded'         // Money returned to customer
  | 'closed'           // Return completed
  | 'error'            // Processing failed
  | 'expired'          // Return deadline expired
  | 'rejected'         // Return rejected by seller
  | 'returned'         // Refund completed
  | 'archived'         // Archived in system
  | 'draft'            // Draft state
  | 'pending'          // Pending processing
  | 'in_transit'       // In transit
  | 'ready_for_pickup' // Ready for pickup
  | 'awaiting_pickup'  // Awaiting at pickup point
  | 'shipped';         // Ready for pickup

/**
 * Return request filters for getReturnRequests()
 */
export interface ReturnRequestFilters {
  /**
   * Filter by return status
   */
  status?: ReturnStatus[];

  /**
   * Filter by date from (YYYY-MM-DD format)
   */
  dateFrom?: string;

  /**
   * Filter by date to (YYYY-MM-DD format)
   */
  dateTo?: string;

  /**
   * Filter by specific order ID
   */
  orderId?: string;

  /**
   * Filter by product ID (nmId)
   */
  nmId?: number;

  /**
   * Filter by supplier article number
   */
  supplierArticle?: string;

  /**
   * Sort results by field
   */
  sortBy?: 'createdAt' | 'updatedAt' | 'orderId' | 'amount' | 'status';

  /**
   * Sort order direction
   */
  sortOrder?: 'asc' | 'desc';

  /**
   * Limit number of results (1-1000)
   */
  limit?: number;

  /**
   * Offset for pagination
   */
  offset?: number;
}

/**
 * Response from getReturnRequests()
 */
export interface ReturnRequestsResponse {
  /**
   * Array of return requests
   */
  data: ReturnRequest[];

  /**
   * Total number of returns matching filters
   */
  total: number;

  /**
   * Current page offset
   */
  offset: number;

  /**
   * Limit applied to this request
   */
  limit: number;

  /**
   * Whether more results are available
   */
  hasMore: boolean;

  /**
   * Response metadata
   */
  metadata?: {
    /**
     * Processing time in milliseconds
     */
    processingTime?: number;

    /**
     * Filters applied (echoed back)
     */
    filters?: ReturnRequestFilters;

    /**
     * Available status counts
     */
    statusCounts?: {
      [key in ReturnStatus]?: number;
    };
  };
}

/**
 * Options for return request processing
 */
export interface ReturnProcessOptions {
  /**
   * Refund amount (for approve action)
   */
  refundAmount?: number;

  /**
   * Rejection reason (required for reject action)
   */
  reason?: string;

  /**
   * Processing notes (optional)
   */
  notes?: string;

  /**
   * Internal flags for processing
   */
  flags?: {
    /**
     * Whether to notify customer
     */
    notifyCustomer?: boolean;

    /**
     * Whether to update inventory
     */
    updateInventory?: boolean;

    /**
     * Whether to track as quality issue
     */
    trackQuality?: boolean;
  };

  /**
   * Additional metadata
   */
  metadata?: Record<string, unknown>;
}

/**
 * Response from processReturnRequest()
 */
export interface ReturnProcessResponse {
  /**
   * Updated return request
   */
  return: ReturnRequest;

  /**
   * Processing result details
   */
  result: {
    /**
     * Action performed
     */
    action: 'approve' | 'reject';

    /**
     * Processing timestamp (ISO 8601)
     */
    processedAt: string;

    /**
     * Whether processing was successful
     */
    success: boolean;

    /**
     * Processing message
     */
    message: string;

    /**
     * Refund amount (if approved)
     */
    refundAmount?: number;

    /**
     * Refund status
     */
    refundStatus?: 'pending' | 'processing' | 'completed' | 'failed';

    /**
     * Rejection reason (if rejected)
     */
    rejectionReason?: string;
  };

  /**
   * Additional information
   */
  additional?: {
    /**
     * Customer notification status
     */
    customerNotified?: boolean;

    /**
     * Inventory update status
     */
    inventoryUpdated?: boolean;

    /**
     * Next steps or required actions
     */
    nextSteps?: string[];

    /**
     * Related transaction IDs
     */
    transactionIds?: string[];
  };
}

/**
 * Placeholder for ReturnRequest interface (main interface should be in the main file)
 */
export interface ReturnRequest {
  id: string;
  status: ReturnStatus;
  createdAt: string;
  // ... other properties should be defined in the main types file
}