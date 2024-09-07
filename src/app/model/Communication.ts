export interface Communication
{
    id:number | null;

    communicationName:string,
    fromPerson : string,
    toPerson : string,
    type : string,
    creationDate: string,
    description : string,
    importance : string,
    pdfFilePath : string

}