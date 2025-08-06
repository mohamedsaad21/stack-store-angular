import { Iproduct } from "./iproduct";

export interface ApiResponse {
    statusCode: number;
    isSuccess: boolean;
    errorMessages: string[] | null;
    result: Iproduct[];
}
