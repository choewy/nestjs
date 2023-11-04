export enum MongoDBConnectionName {
  Logger = 'logger',
}

export enum PaypalOrderStatus {
  Created = 'CREATED',
  Saved = 'Saved',
  Approved = 'APPROVED',
  Voided = 'VOIDED',
  Completed = 'COMPLETED',
  ActionRequired = 'PAYER_ACTION_REQUIRED',
}
