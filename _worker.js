export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 目标站
    const targetOrigin = 'https://anyrouter.top';
    const targetUrl = targetOrigin + url.pathname + url.search;

    // 构造发给 anyrouter.top 的请求
    const newRequest = new Request(targetUrl, {
      method: request.method,
      headers: request.headers,
      body: request.body,
      redirect: 'manual',
    });

    // 很关键：Host 头改成 anyrouter.top
    newRequest.headers.set('Host', 'anyrouter.top');

    // 转发请求
    const response = await fetch(newRequest);

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
    });
  }
}
