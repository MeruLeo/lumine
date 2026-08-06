export interface ApiEnvelopeDto<TData> {
  success: boolean;
  message: string;
  data: TData;
}
