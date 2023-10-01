import { request, requestHeaders } from '@app/helpers/http/request';

const mockBaseUrl = '@app/mock';
const resourceData = <R>(resource: string): Promise<R> =>
    import(`${mockBaseUrl}${resource}`);

if (__USE_MOCKS__) {
    console.info('Mocking requests...');
}

export const lazyMock = async <R>(resource: string) =>
    await resourceData<R>(`@app${resource}`);

export const mockRequest = <D, T>(resource: RequestInfo) =>
    request<D, T>(resource, {
        headers: requestHeaders
    });