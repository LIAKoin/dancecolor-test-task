export interface IListSourceSub {
    text: string
    href: string
}

export interface IListSource extends IListSourceSub {
    submenu: IListSourceSub[]
}