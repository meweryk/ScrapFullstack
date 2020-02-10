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
    view?: Date
    send?: Date
    got?: Date
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
    percentIn: number
    percentOut: number
    compare: number
    compareIn: number
    compareOut: number
    yesterday: number
    yesterdayIn: number
    yesterdayOut: number
    OutisHigher: boolean
    isHigherIn: boolean
    isHigherOut: boolean
}

export interface AnalyticsPage {
    average: number
    averageIn: number
    averageOut: number
    chart: AnalyticsChartItem[]
}

export interface AnalyticsChartItem {
    gain: number
    gainIn: number
    gainOut: number
    orderIn: number
    orderOut: number
    order: number
    label: string
}

export interface Delivery {
    date?: Date
    shopHost: string
    shopSend: string
    train: string
    waybill: string
    order?: number
    user?: string
    list: DeliveryPosition[]
    imageSrc?: string
    _id?: string
}

export interface DeliveryPosition {
    name: String
    fraction: String
    quantity: Number
    rank: String
    trash: Number
    trashStap: String
    quantityNoTrash: Number
    cost: Number
}