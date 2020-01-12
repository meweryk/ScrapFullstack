export interface User {
    email: string
    password: string
    nicname: string
    shop: string
}

export interface Message {
    message: string
}

export interface Category {
    name: string
    imageSrc?: string
    user?: string
    _id?: string
}

export interface MaterialList {
    materials: Material[]
    arrClassSteel: string[]
    arrGroupSteel: string[]
    arrName: string[]
}

export interface Material {
    vid: string
    ni?: number
    cr?: number
    mo?: number
    cu?: number
    mn?: number
    w?: number
    v?: number
    co?: number
    si?: string
    ti?: number
    al?: string
    nb?: string
    fe?: number
    s?: number
    p?: number
    c?: number
    classSteel: string
    groupSteel?: string
    markSteel?: string
    user?: string
    _id?: string
}

export interface Position {
    name: string
    cost: number
    user?: string
    category: string
    _id?: string
    quantity?: number
    stock?: number
    rank?: string
    shop?: string

}

export interface Order {
    date?: Date
    order?: number
    user?: string
    list: OrderPosition[]
    _id?: string
    shopBuyer?: string
    nicname?: string
}

export interface OrderPosition {
    name: string
    cost: number
    quantity: number
    _id?: string
    shopSeller?: string
}

export interface Filter {
    start?: Date
    end?: Date
    order?: number
}

export interface FilterMaterial {
    classSteel?: string
    groupSteel?: string
    vid?: string
}

export interface OverviewPage {
    orders: OverviewPageItem
    gain: OverviewPageItem

}

export interface OverviewPageItem {
    percent: number
    compare: number
    yesterday: number
    isHigher: boolean
}

export interface AnalyticsPage {
    average: number
    chart: AnalyticsChartItem[]
}

export interface AnalyticsChartItem {
    gain: number
    order: number
    label: string
}