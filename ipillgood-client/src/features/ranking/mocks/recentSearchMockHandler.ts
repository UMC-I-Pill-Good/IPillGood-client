import { delay, http, HttpResponse } from 'msw';
import { MOCK_RECENT_KEYWORDS_API_PATH } from '../api/recentSearch';
import {
  clearMockRecentKeywords,
  deleteMockRecentKeyword,
  getMockRecentKeywords,
  saveMockRecentKeyword,
} from '../services/recentSearchMockService';

export const recentSearchMockHandlers = [
  http.get(MOCK_RECENT_KEYWORDS_API_PATH, async () => {
    await delay(200);

    return HttpResponse.json(await getMockRecentKeywords());
  }),
  http.post(MOCK_RECENT_KEYWORDS_API_PATH, async ({ request }) => {
    const body = (await request.json()) as { keyword?: string };
    const response = await saveMockRecentKeyword(body.keyword ?? '');

    await delay(200);

    return HttpResponse.json(response, {
      status: response.isSuccess ? 201 : 400,
    });
  }),
  http.delete(`${MOCK_RECENT_KEYWORDS_API_PATH}/:keywordId`, async ({ params }) => {
    const keywordId = Number(params.keywordId);
    const response = await deleteMockRecentKeyword(keywordId);

    await delay(200);

    return HttpResponse.json(response, {
      status: response.isSuccess ? 200 : 404,
    });
  }),
  http.delete(MOCK_RECENT_KEYWORDS_API_PATH, async () => {
    await delay(200);

    return HttpResponse.json(await clearMockRecentKeywords());
  }),
];
