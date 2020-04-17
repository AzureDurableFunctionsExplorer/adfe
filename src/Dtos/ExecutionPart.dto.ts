export interface ExecutionPartsDto {
  id: string,
  title: string,
  input: any,
  output: any,
  startTime?: Date,
  endTime?: Date,
  children: ExecutionPartsDto[]
}