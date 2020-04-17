export interface ExecutionPartsModel {
  id: string,
  title: string,
  input: string,
  output: string,
  startTime: Date,
  endTime: Date,
  children: ExecutionPartsModel[]
}