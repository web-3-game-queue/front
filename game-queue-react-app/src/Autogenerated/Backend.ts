/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface AddUserRequest {
    /**
     * @minLength 0
     * @maxLength 100
     */
    name: string;
    /** @minLength 1 */
    password: string;
    /**
     * @format int32
     * @min 0
     * @max 2147483647
     */
    level: number;
    role?: UserRole;
}

export interface Map {
    /** @format int32 */
    id?: number;
    name?: string | null;
    /** @format int32 */
    width?: number;
    /** @format int32 */
    height?: number;
    /** @format int32 */
    maxPlayersCount?: number;
    coverImageUrl?: string | null;
    description?: string | null;
    mapStatus?: MapStatus;
}

export enum MapStatus {
    Pending = "Pending",
    Available = "Available",
    Deleted = "Deleted",
}

export interface SearchMapsRequest {
    /** @format int32 */
    id?: number;
    /** @format int32 */
    creatorUserId?: number;
    status?: SearchMapsRequestStatus;
    /** @format date-time */
    creationDate?: string;
    /** @format date-time */
    composeDate?: string | null;
    /** @format date-time */
    doneDate?: string | null;
    /** @format int32 */
    mapsCount?: number;
}

export interface SearchMapsRequestVerbose {
    /** @format int32 */
    id?: number;
    creatorUser?: User;
    status?: SearchMapsRequestStatus;
    /** @format date-time */
    creationDate?: string;
    /** @format date-time */
    composeDate?: string | null;
    /** @format date-time */
    doneDate?: string | null;
    maps?: Map[] | null;
}

export enum SearchMapsRequestStatus {
    Draft = "Draft",
    Composed = "Composed",
    Done = "Done",
    Cancelled = "Cancelled",
    Deleted = "Deleted",
}

export interface User {
    /** @format int32 */
    id?: number;
    name?: string | null;
    /** @format int32 */
    level?: number;
    role?: UserRole;
    claims?: string[] | null;
}

export enum UserRole {
    Client = "Client",
    Moderator = "Moderator",
    Administrator = "Administrator",
}

export const MapToString = (map: Map) =>
    `${map.name} ${map.width}x${map.height} (${map.maxPlayersCount}p)`;

export const SearchMapsRequestStatusToString = (searchMapsRequestStatus?: SearchMapsRequestStatus) => {
    switch (searchMapsRequestStatus) {
        case SearchMapsRequestStatus.Draft:
            return 'Черновик';
        case SearchMapsRequestStatus.Cancelled:
            return 'Отменено';
        case SearchMapsRequestStatus.Composed:
            return 'Сформировано';
        case SearchMapsRequestStatus.Deleted:
            return 'Удалено';
        case SearchMapsRequestStatus.Done:
            return 'Завершено';

        default:
            return '[ДАННЫЕ ███████]';
    }
}