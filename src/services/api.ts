import {ApiConfig, GetItemsWithSearchParams, TItems} from '../declarations';

export class Api {
    private _baseurl: string;
    private _headers: Record<string, string>;

    constructor({baseUrl, headers}: ApiConfig) {
        this._baseurl = baseUrl;
        this._headers = headers ?? {};
    }

    private async _onResponse<T>(res: Response): Promise<T> {
        if (res.ok) {
            return await res.json();
        } else {
            throw new Error(`Error: ${res.status}`);
        }
    }

    async getItemsWithSearch({search, exceptions}: GetItemsWithSearchParams): Promise<TItems[]> {
        const response = await fetch(`${this._baseurl}/items?model_like=${search}&${exceptions}`, {
            headers: this._headers,
        });
        return await this._onResponse<TItems[]>(response);
    }

    async getItemsWithLimit(limit: number): Promise<TItems[]> {
        const response = await fetch(`${this._baseurl}/items?_limit=${limit}`, {
            headers: this._headers,
        });
        return await this._onResponse<TItems[]>(response);
    }
}

const baseUrl = process.env.API_BASE_URL || 'http://localhost:3001';
const headers = {
    'Content-Type': 'application/json',
};

const api = new Api({baseUrl, headers});

export default api;