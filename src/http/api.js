import serve from "./config";

export const userSmsLoginApi = function (data) {
    // 用户通过短信登录或注册
    return serve({
        url: "/user/smsAuthentication",
        data: data,
        method: "POST"
    })
}

export const userInfoApi = function () {
// 查询用户信息
    return serve({
        url: "/user/info",
        method: "POST"
    })
}

export const resourceBannerApi = function () {
    // 查询banner信息
    return serve({
        url: "/res/banner",
        method: "GET"
    })
}

export const resourceListApi = function (data) {
// 查询视频列表
    return serve({
        url: "/res/",
        method: "GET",
        params: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize
        }
    })
}

export const resourceDetailApi = function (resourceId) {
// 查询视频详情
    return serve({
        url: "/res/" + resourceId,
        method: "POST"
    })
}


export const resourceBuyApi = function (resourceId) {
    // 资源支付
    return serve({
        url: "/res/resourceBuy",
        method: "POST",
        data: {resourceId: resourceId}
    })
}

