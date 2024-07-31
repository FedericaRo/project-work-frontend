export interface Communication
{
    id:number | null;

    communicationName:string,
    fromPerson : string,
    toPerson : string,
    type : string,
    description : string,
    creationDate : Date,
    importance : string

}