export type docType={
    id:number
    title:string
    content:string
}

export type docsStateType={
    current:docType,
    docs:docType[]
}