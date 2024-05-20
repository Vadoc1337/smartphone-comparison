import {SerializedError} from "@reduxjs/toolkit";
import {ChangeEvent} from "react";

type TItems = {
    id: number;
    img: string;
    model: string;
    manufacturer: string;
    releaseYear: string;
    screenDiagonal: string;
    manufacturerCountry: string;
    memory: string;
    screenRefreshRate: string;
    NFC: boolean;
    ESIMSupport: boolean;
    wirelessChargingSupport: boolean;
    price: string;
};

// ? services types

type ApiConfig = {
    baseUrl: string;
    headers: any;
};


type GetItemsWithSearchParams = {
    search: string;
    exceptions: string;
};

type TItemList = {
    items: TItems[];
};

type TCharacteristic = {
    [key: string]: string[] | boolean[];
};

type  TSpecifications = {
    [key: string]: string;
};

// ? components types

type TPagination = {
    label: string,
    start: number,
    end: number,
    current: number,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
}

// ? Items slice

type TItemsState = {
    items: TItems[];
    searchedItems: TItems[];
    exceptions: string;
    specifications: [string, string[] | boolean[]][];
    loadingItems: boolean;
    loadingSearch: boolean;
    errorItems: SerializedError | null | unknown;
    errorSearch: SerializedError | null | unknown;
};

export type {
    TItems,
    TItemList,
    TCharacteristic,
    TSpecifications,
    TItemsState,
    ApiConfig,
    TPagination,
    GetItemsWithSearchParams
}


