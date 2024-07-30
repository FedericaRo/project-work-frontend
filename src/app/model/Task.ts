export interface Task
{
  id: number | null;
  name:string;
  description:string;
  frequency:string;
  creationDate:string;
  completionDate:string;
  status:string;
  signature:string;
}