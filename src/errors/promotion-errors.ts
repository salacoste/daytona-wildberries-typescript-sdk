import { WBAPIError } from './base-error';
import { ValidationError } from './validation-error';

/**
 * Error thrown when a campaign is not found by its ID.
 *
 * This error typically occurs when:
 * - Campaign was deleted
 * - Campaign ID is incorrect
 * - Campaign belongs to another seller account
 *
 * @example
 * ```typescript
 * import { CampaignNotFoundError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.promotion.startCampaign(123456);
 * } catch (error) {
 *   if (error instanceof CampaignNotFoundError) {
 *     console.error('Campaign does not exist:', error.message);
 *     // Verify campaign ID and try again
 *   }
 * }
 * ```
 */
export class CampaignNotFoundError extends WBAPIError {
  /**
   * Campaign ID that was not found
   */
  public readonly campaignId: number;

  /**
   * Creates a CampaignNotFoundError
   *
   * @param campaignId - ID of the campaign that wasn't found
   * @param response - API response body if available
   * @param requestId - Correlation ID for debugging
   */
  constructor(campaignId: number, response?: unknown, requestId?: string) {
    super(`Campaign not found: ${campaignId}`, 404, response, requestId);
    this.name = 'CampaignNotFoundError';
    this.campaignId = campaignId;
  }

  /**
   * Returns user-friendly error message with recovery guidance
   *
   * @returns Error message with actionable steps
   */
  getUserMessage(): string {
    const baseMessage = super.getUserMessage();

    const guidance = [
      '\n\nTo resolve this issue:',
      `1. Verify that campaign ID ${this.campaignId} is correct`,
      '2. Check if the campaign was deleted',
      '3. Ensure you have access to this campaign in your account',
      '4. Use getCampaignCount() to list all available campaigns',
    ].join('\n');

    return baseMessage + guidance;
  }

  /**
   * Custom JSON serialization
   */
  toJSON(): {
    name: string;
    message: string;
    statusCode: number;
    campaignId: number;
    response?: unknown;
    requestId?: string;
  } {
    return {
      ...super.toJSON(),
      statusCode: 404,
      campaignId: this.campaignId,
    };
  }
}

/**
 * Error thrown when bid amount is invalid or below minimum.
 *
 * This error occurs when:
 * - Bid is below the minimum required amount
 * - Bid format is incorrect
 * - Bid exceeds maximum allowed amount
 *
 * @example
 * ```typescript
 * import { InvalidBidError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.promotion.updateAuctionBids({
 *     bids: [{ advert_id: 123, nm_bids: [{ nm_id: 456, bid: 50, placement: 'search' }] }]
 *   });
 * } catch (error) {
 *   if (error instanceof InvalidBidError) {
 *     console.error(`Minimum bid is ${error.minBid}`);
 *     // Increase bid amount and retry
 *   }
 * }
 * ```
 */
export class InvalidBidError extends ValidationError {
  /**
   * Minimum bid amount required (if available)
   */
  public readonly minBid?: number;

  /**
   * Maximum bid amount allowed (if applicable)
   */
  public readonly maxBid?: number;

  /**
   * Current bid amount that was rejected
   */
  public readonly currentBid?: number;

  /**
   * Creates an InvalidBidError
   *
   * @param message - Error message describing the bid validation failure
   * @param context - Additional context (minBid, maxBid, currentBid)
   * @param response - API response body if available
   * @param requestId - Correlation ID for debugging
   */
  constructor(
    message: string,
    context?: {
      field?: string;
      minBid?: number;
      maxBid?: number;
      currentBid?: number;
    },
    response?: unknown,
    requestId?: string
  ) {
    const fieldErrors = context?.field ? { [context.field]: message } : { bid: message };

    super(message, fieldErrors, 400, response, requestId);
    this.name = 'InvalidBidError';
    this.minBid = context?.minBid;
    this.maxBid = context?.maxBid;
    this.currentBid = context?.currentBid;
  }

  /**
   * Returns user-friendly error message with bid requirements
   *
   * @returns Error message with specific bid constraints
   */
  getUserMessage(): string {
    const baseMessage = super.getUserMessage();

    const bidInfo: string[] = [];

    if (this.minBid !== undefined) {
      bidInfo.push(`Minimum bid: ${this.minBid} руб.`);
    }

    if (this.maxBid !== undefined) {
      bidInfo.push(`Maximum bid: ${this.maxBid} руб.`);
    }

    if (this.currentBid !== undefined) {
      bidInfo.push(`Your bid: ${this.currentBid} руб.`);
    }

    if (bidInfo.length > 0) {
      const guidance = [
        '\n\nBid requirements:',
        ...bidInfo.map((info) => `  - ${info}`),
        '\nPlease adjust your bid to meet these requirements.',
      ].join('\n');

      return baseMessage + guidance;
    }

    return baseMessage;
  }

  /**
   * Custom JSON serialization
   */
  toJSON(): {
    name: string;
    message: string;
    statusCode: number;
    fieldErrors?: Record<string, string>;
    minBid?: number;
    maxBid?: number;
    currentBid?: number;
    response?: unknown;
    requestId?: string;
  } {
    return {
      ...super.toJSON(),
      minBid: this.minBid,
      maxBid: this.maxBid,
      currentBid: this.currentBid,
    };
  }
}

/**
 * Error thrown when campaign budget is exceeded or insufficient.
 *
 * This error occurs when:
 * - Requested operation would exceed campaign budget
 * - Insufficient funds in account for deposit
 * - Budget limit reached for billing period
 *
 * @example
 * ```typescript
 * import { BudgetExceededError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   await sdk.promotion.createBudgetDeposit({ sum: 50000 }, { id: 123 });
 * } catch (error) {
 *   if (error instanceof BudgetExceededError) {
 *     console.error(`Budget exceeded: ${error.message}`);
 *     console.error(`Available: ${error.availableBudget}, Required: ${error.requiredBudget}`);
 *   }
 * }
 * ```
 */
export class BudgetExceededError extends WBAPIError {
  /**
   * Available budget amount
   */
  public readonly availableBudget?: number;

  /**
   * Required budget amount for the operation
   */
  public readonly requiredBudget?: number;

  /**
   * Creates a BudgetExceededError
   *
   * @param message - Error message describing the budget issue
   * @param context - Budget information (available, required)
   * @param response - API response body if available
   * @param requestId - Correlation ID for debugging
   */
  constructor(
    message: string,
    context?: {
      availableBudget?: number;
      requiredBudget?: number;
    },
    response?: unknown,
    requestId?: string
  ) {
    super(message, 400, response, requestId);
    this.name = 'BudgetExceededError';
    this.availableBudget = context?.availableBudget;
    this.requiredBudget = context?.requiredBudget;
  }

  /**
   * Returns user-friendly error message with budget details
   *
   * @returns Error message with budget information
   */
  getUserMessage(): string {
    const baseMessage = super.getUserMessage();

    const budgetInfo: string[] = [];

    if (this.availableBudget !== undefined) {
      budgetInfo.push(`Available budget: ${this.availableBudget} руб.`);
    }

    if (this.requiredBudget !== undefined) {
      budgetInfo.push(`Required budget: ${this.requiredBudget} руб.`);
    }

    if (budgetInfo.length > 0) {
      const guidance = [
        '\n\nBudget information:',
        ...budgetInfo.map((info) => `  - ${info}`),
        '\nTo resolve this issue:',
        '1. Check your account balance using getAdvBalance()',
        '2. Add funds to your advertising account',
        '3. Reduce the requested budget or bid amounts',
        '4. Contact Wildberries support for account limit increases',
      ].join('\n');

      return baseMessage + guidance;
    }

    const guidance = [
      '\n\nTo resolve this issue:',
      '1. Check your account balance using getAdvBalance()',
      '2. Add funds to your advertising account',
      '3. Verify campaign budget limits',
    ].join('\n');

    return baseMessage + guidance;
  }

  /**
   * Custom JSON serialization
   */
  toJSON(): {
    name: string;
    message: string;
    statusCode: number;
    availableBudget?: number;
    requiredBudget?: number;
    response?: unknown;
    requestId?: string;
  } {
    return {
      ...super.toJSON(),
      statusCode: 400,
      availableBudget: this.availableBudget,
      requiredBudget: this.requiredBudget,
    };
  }
}

/**
 * Error thrown when attempting invalid campaign state transitions.
 *
 * Campaign lifecycle states:
 * - `-1`: Deleted (being deleted, will complete in 10 minutes)
 * - `4`: Ready to launch
 * - `7`: Completed
 * - `8`: Cancelled
 * - `9`: Active
 * - `11`: Paused
 *
 * Valid transitions:
 * - Ready (4) → Active (9) via startCampaign()
 * - Active (9) → Paused (11) via pauseCampaign()
 * - Paused (11) → Active (9) via startCampaign()
 * - Active/Paused → Completed (7) via stopCampaign()
 *
 * @example
 * ```typescript
 * import { InvalidCampaignStateError } from 'daytona-wildberries-typescript-sdk';
 *
 * try {
 *   // Trying to start an already active campaign
 *   await sdk.promotion.startCampaign(123);
 * } catch (error) {
 *   if (error instanceof InvalidCampaignStateError) {
 *     console.error(`Cannot ${error.attemptedAction} campaign in ${error.currentState} state`);
 *     console.error('Valid states:', error.validStates);
 *   }
 * }
 * ```
 */
export class InvalidCampaignStateError extends WBAPIError {
  /**
   * Current campaign state
   */
  public readonly currentState: string;

  /**
   * Action that was attempted
   */
  public readonly attemptedAction: string;

  /**
   * List of valid states for the attempted action
   */
  public readonly validStates?: string[];

  /**
   * Creates an InvalidCampaignStateError
   *
   * @param currentState - Current state of the campaign
   * @param attemptedAction - Action that was attempted (start, pause, stop, delete)
   * @param validStates - Optional list of valid states for this action
   * @param response - API response body if available
   * @param requestId - Correlation ID for debugging
   */
  constructor(
    currentState: string,
    attemptedAction: string,
    validStates?: string[],
    response?: unknown,
    requestId?: string
  ) {
    super(`Cannot ${attemptedAction} campaign in ${currentState} state`, 400, response, requestId);
    this.name = 'InvalidCampaignStateError';
    this.currentState = currentState;
    this.attemptedAction = attemptedAction;
    this.validStates = validStates;
  }

  /**
   * Returns user-friendly error message with state transition guidance
   *
   * @returns Error message with valid state transitions
   */
  getUserMessage(): string {
    const baseMessage = super.getUserMessage();

    const stateGuide: string[] = [
      '\n\nCampaign state information:',
      `  - Current state: ${this.currentState}`,
    ];

    if (this.validStates && this.validStates.length > 0) {
      stateGuide.push(
        `  - Valid states for ${this.attemptedAction}: ${this.validStates.join(', ')}`
      );
    }

    const transitionGuide = [
      '\nValid state transitions:',
      '  - Ready (4) → Active (9): Use startCampaign()',
      '  - Active (9) → Paused (11): Use pauseCampaign()',
      '  - Paused (11) → Active (9): Use startCampaign()',
      '  - Active/Paused → Completed (7): Use stopCampaign()',
      '\nTo resolve this issue:',
      '1. Check current campaign state using getCampaigns() or getAuctionAdverts()',
      '2. Ensure campaign is in a valid state for this operation',
      '3. Review campaign lifecycle documentation',
    ].join('\n');

    return baseMessage + stateGuide.join('\n') + transitionGuide;
  }

  /**
   * Custom JSON serialization
   */
  toJSON(): {
    name: string;
    message: string;
    statusCode: number;
    currentState: string;
    attemptedAction: string;
    validStates?: string[];
    response?: unknown;
    requestId?: string;
  } {
    return {
      ...super.toJSON(),
      statusCode: 400,
      currentState: this.currentState,
      attemptedAction: this.attemptedAction,
      validStates: this.validStates,
    };
  }
}
