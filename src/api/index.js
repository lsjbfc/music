import { Post } from "./request.js";
/**
 * 获取轮播图
 * @param {*} params
 */
export const GetTopAdList = async function(params) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/CommonService/GetTopAdList",
      data: {}
    }
  });
  return p.data;
};
/**
 * 获取公告
 * @param {*} params
 */
export const GetNoticeList = async function(pageIndex = 1, pageSize = 20) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/CommonService/GetNoticeList",
      data: {
        pageIndex: pageIndex,
        pageSize: pageSize
      }
    }
  });
  return p.data;
};
/**
 * 项目精选
 */
export const GetTopProjectList = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/InvestService/GetTopProjectList",
      data: {}
    }
  });
  return p.data;
};
/**
 * 平台项目页面
 */
export const QueryUserInvest = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserInvest",
      data: {}
    }
  });

  return p.data;
};
/**
 * 查询用户信息
 */
// /UserService/GetUserAccountAmount
export const GetUserInfo = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/GetUserAccountAmount",
      data: {}
    }
  });

  return p.data;
};

/**
 * 获取账号 开户时获取系统分配的账号
 */
// UserService/GetUserAccountNo
export const GetUserAccountNo = async function(params) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/GetUserAccountNo",
      data: {}
    }
  });
  return p.data;
};

/**
 * 获取推荐开户人最低金额
 */
export const QueryOpenSubAccountLimitAmount = async function(params) {
  let p;
  // /CommonService/QueryOpenSubAccountLimitAmount
  p = await Post({
    url: "",
    data: {
      route: "/CommonService/QueryOpenSubAccountLimitAmount",
      data: {}
    }
  });
  return p.data;
};
/**
 * 推荐开户人信息
 * /UserService/GetUserAccountNo
 */
export const GetUserAccountInfo = async function(params) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/GetUserAccountNo",
      data: {}
    }
  });
  return p.data;
};
/**
 * 查询用户资产信息
 * @param {string} type 1 现金宝 2投资宝 4消费红包 8合约资产
 */
export const QueryUserAccountAssets = async function(type) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserAccountAssets",
      data: {
        type
      }
    }
  });
  return p.data;
};

/**
 * 推荐开户
 * @param {*} accountNo
 * @param {*} name
 * @param {*} mobile
 * @param {*} consumeId
 * @param {*} passowrd
 * @param {*} normal 普通开户 true 新店帮扶 false
 */
export const RecommendOpenAccount = async function(
  accountNo,
  name,
  mobile,
  passowrd,
  normal,
  id
) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/RecommendOpenAccount",
      data: {
        accountNo: accountNo,
        name: name,
        mobile: mobile,
        password: passowrd,
        normal: normal,
        id
      }
    }
  });
  return p.data;
};

/**
 * 提交绑定账号
 * @param {string} accountNo 账号
 */
// /UserService/SubmitBindUserAccount
export const SubmitBindUserAccount = async function(accountNo) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/SubmitBindUserAccount",
      data: {
        accountNo: accountNo
      }
    }
  });
  return p.data;
};

/**
 * 保存用户绑定信息
 * /UserService/SaveBindUserAccount
 */
export const SaveBindUserAccount = async function(accountNo, code, payPwd) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/SaveBindUserAccount",
      data: {
        accountNo,
        code,
        payPwd
      }
    }
  });
  return p.data;
};
/**
 * 我的团队成员
 */
export const QueryUserTeamInfo = async function() {
  let p;

  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserTeamInfo",
      data: {}
    }
  });
  return p.data;
};

/**
 *我的直属用户信息
 * @param {number} id 直属下级的用户编号
 */
export const QueryUserTeamAccount = async function(id) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserTeamAccount",
      data: {
        id
      }
    }
  });
  return p.data;
};
/**
 *当前下级的直属列表信息
 * @param {string,number} id 查询用户id
 */
// /UserService/QueryUserSubTeamAccount
export const QueryUserSubTeamAccount = async function(id) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserSubTeamAccount",
      data: {
        id
      }
    }
  });
  return p.data;
};

// ：/UserService/QueryUserRewardProfitList
/**
 * 奖励明细
 * @param {string} date 时间
 * @param {string} type 类型
 */
export const QueryUserRewardProfitList = async function(date) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserRewardProfitList",
      data: {
        date
      }
    }
  });
  return p.data;
};
// /UserService/QueryUserRewardProfitDetailList
/**
 *
 * @param {string,number} type 类型
 * @param {string} date yy-mm 时间
 * @param {*} lastId
 * @param {*} count
 */
export const QueryUserRewardProfitDetailList = async function(
  type,
  date,
  lastId,
  count
) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserRewardProfitDetailList",
      data: {
        type,
        date
      }
    }
  });
  return p.data;
};

// /UserService/QueryUserPayChannelList
/**
 * 当前用户的付款方式每种方式中的可用
 */
export const QueryUserPayChannelList = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserPayChannelList",
      data: {}
    }
  });
  return p.data;
};
// /CommonService/QueryApplyBuyLimitAmount
/**
 * 申购最低金额
 */
export const QueryApplyBuyLimitAmount = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/CommonService/QueryApplyBuyLimitAmount",
      data: {}
    }
  });
  return p.data;
};

/**
 * 生成申购项目单
 * @param {string,number} amount 申购金额
 */
export const ProductPurchaseApplyOrder = async function(amount) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/InvestService/ProductPurchaseApplyOrder",
      data: {
        amount
      }
    }
  });
  return p.data;
};

// /InvestService/PayPurchaseApplyOrder
/**
 * 支付申购项目单
 * @param {string,number} orderId 订单编号
 * @param {string,number} password 支付密码
 * @param {string,number} userType 支付方式
 */
export const PayPurchaseApplyOrder = async function(
  orderId,
  password,
  userType
) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/InvestService/PayPurchaseApplyOrder",
      data: {
        orderId,
        password,
        userType
      }
    }
  });
  return p.data;
};
// /UserService/QueryUserApplyProjectTradeDetail
/**
 *订单详情
 * @param {string,number} projectId 订单id
 */
export const QueryUserApplyProjectTradeDetail = async function(
  projectId,
  lastId,
  count
) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserApplyProjectTradeDetail",
      data: {
        projectId,
        lastId,
        count
      }
    }
  });
  return p.data;
};

/**
 * 用户的合约资产信息
 */
export const QueryUserContractAssets = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserContractAssets",
      data: {}
    }
  });
  return p.data;
};
// /UserService/QueryUserTeam
/**
 * 我的团队
 */
export const QueryUserTeam = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserTeam",
      data: {}
    }
  });
  return p.data;
};
/**
 * 给下级转账时需要查询下级用户信息和投资宝信息
 * @param {string,number} subUserId 被转账用户id
 */
export const QueryInvestmentAccount = async function(subUserId) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryInvestmentAccount",
      data: { subUserId }
    }
  });
  return p.data;
};

// /UserService/TransferInvestmentAmountOut
/**
 * 当前用户通过投资宝给其他用户转账
 * @param {number,stirng} amount 转账金额
 * @param {string} password 用户密码
 * @param {number,stirng} receId 接受转账用户id
 */
export const TransferInvestmentAmountOut = async function(
  amount,
  password,
  receId
) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/TransferInvestmentAmountOut",
      data: { amount, password, receId }
    }
  });
  return p.data;
};

// /UserService/TransferInvestmentAmount
/**
 *现金宝转投资宝
 * @param {*} amount
 * @param {*} password
 */
export const TransferInvestmentAmount = async function(amount, password) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/TransferInvestmentAmount",
      data: { amount, password }
    }
  });
  return p.data;
};

/**
 * 获取设置页面数据
 */
export const QueryCurrUserInfo = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryCurrUserInfo",
      data: {}
    }
  });
  return p.data;
};

/**
 *保存身份证号
 *@param {string} cardNo 身份证号
 */
export const SaveUserAccountCardNo = async function(cardNo) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/SaveUserAccountCardNo",
      data: { cardNo }
    }
  });
  return p.data;
};

/**
 * 校验支付密码
 * @param {string} password 原支付密码
 */
export const ValidateUserAccountPayPassword = async function(password) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/ValidateUserAccountPayPassword",
      data: { password }
    }
  });
  return p.data;
};

// /UserService/SaveUserAccountPayPassword
/**
 * 使用支付密码更改支付密码
 * @param {string,number} oldPwd 原支付密码
 * @param {string,number} newPwd 新支付密码
 */
export const SaveUserAccountPayPassword = async function(oldPwd, newPwd) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/SaveUserAccountPayPassword",
      data: { oldPwd, newPwd }
    }
  });
  return p.data;
};

/**
 * 给用户发送短信验证码 通过手机号短信验证码修改支付密码
 */
export const SendUserAccountCode = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/SendUserAccountCode",
      data: {}
    }
  });
  return p.data;
};
/**
 * 修改绑定手机号发送验证码
 * @param {*} mobile 手机号
 */
export const ChangeUserAccountMobile = async function(mobile) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/ChangeUserAccountMobile",
      data: { mobile: mobile }
    }
  });
  return p.data;
};
/**
 *更换手机时给新手机发送验证码
 * @param {*} mobile 手机号
 * @param {*} code 手机验证码
 */
export const SaveUserAccountMobile = async function(mobile, code) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/SaveUserAccountMobile",
      data: { mobile: mobile, code: code }
    }
  });
  return p.data;
};

/**
 *不记得原支付密码,通过验证码保存用户支付密码
 * @param {string,number} code 短信验证码
 * @param {*} newPwd 新密码
 */
export const SaveUserAccountPayPasswordByCode = async function(code, newPwd) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/SaveUserAccountPayPasswordByCode",
      data: { code, newPwd }
    }
  });
  return p.data;
};

/**
 *获取投资宝交易记录信息
 * @param {string} lastId 列表上的最后一个id 默认0
 * @param {string} count 列表条数
 * @param {strubg} type null-全部 0-收入 1-支出
 */
export const QueryInvestAccountTradeRecords = async function(
  lastId,
  count,
  type
) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryInvestAccountTradeRecords",
      data: { lastId, count, type }
    }
  });
  return p.data;
};

/**
 * 获取投资宝交易记录信息详情
 * @param {string,number} id
 */
export const QueryInvestAccountTradeRecord = async function(id) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryInvestAccountTradeRecord",
      data: { id }
    }
  });
  return p.data;
};

/**
 * 投资宝冻结列表
 * @param {string} lastId 列表上的最后一个id 默认0
 * @param {string} count 列表条数
 */
export const QueryUserAccountFreezeRecords = async function(
  lastId,
  count = 10
) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserAccountFreezeRecords",
      data: { lastId, count }
    }
  });
  return p.data;
};

// /UserService/QueryUserContractAssetsDetail
/**
 * 用户的合约资产信息,收益明细信息
 * @param {string} lastId
 * @param {number} count
 * @param {string} type 0 表示所有 1表示今年 2表示昨日
 */
export const QueryUserContractAssetsDetail = async function(
  lastId,
  count = 10,
  type
) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserContractAssetsDetail",
      data: { lastId, count, type }
    }
  });
  return p.data;
};

/**
 *用户的申购的项目详细信息
 *@param {string} OrderId 项目id
 */
export const QueryUserApplyProjectDetail = async function(orderId) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserInvestOrderDetail",
      data: {
        orderId
      }
    }
  });
  return p.data;
};

/**
 *用户的消费基金详细信息。
 * @param {string} orderId 申购单id
 * @param {string} lastId
 * @param {string} count
 */
export const QueryUserApplyTradeChangeRecords = async function(
  orderId,
  lastId,
  count
) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserApplyTradeChangeRecords",
      data: {
        orderId,
        lastId,
        count
      }
    }
  });
  return p.data;
};

// type 0 全部 1 近三个月 2 近一个月 3 近一周 4 今年来的
// /UserService/QueryUserApplyProjectTradeDetail

// /UserService/QueryUserWaitActivateConsume
/**
 * 消费红包页面
 */
export const QueryUserWaitActivateConsume = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserWaitActivateConsume",
      data: {}
    }
  });
  return p.data;
};

// /UserService/QueryUserConsumeDetail
// 消费基金详细信息。
/**
 * 消费基金详细信息。
 */
export const QueryUserConsumeDetail = async function(id) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserConsumeDetail",
      data: { id }
    }
  });
  return p.data;
};

// /UserService/ActivateConsumeAccount
/**
 * 加持激活用户的消费基金
 * @param {string} id
 * @param {string} payPwd
 */
export const ActivateConsumeAccount = async function(id, payPwd) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/ActivateConsumeAccount",
      data: { id, payPwd }
    }
  });
  return p.data;
};

/**
 * 在激活时查询要全部激活的金额
 */
export const QueryActivateConsumeAccount = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryActivateConsumeAccount",
      data: {}
    }
  });
  return p.data;
};

/**
 *项目持股人数人数详情
 *@param {string} id 项目id
 */
export const QueryProjectHoldCountList = async function(id) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/InvestService/QueryProjectHoldCountList",
      data: { id }
    }
  });
  return p.data;
};

/**
 * 查询项目详情
 * @param {string} id 项目id
 */
export const QueryProjectDetail = async function(id) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/InvestService/QueryProjectDetail",
      data: { id }
    }
  });
  return p.data;
};

// /UserService/QueryUserApplyProjectProfitDetail
/**
 *
 * @param {*} orderId 订单id
 * @param {*} type  0 全部 1 近三个月 2 近一个月 3 近一周 4 今年来的
 * @param {*} date null第一页 下一页list的最后一个日期
 * @param {*} count 需要获取的记录条数
 */
export const QueryUserApplyProjectProfitDetail = async function(
  orderId,
  type,
  date,
  count
) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserApplyProjectProfitDetail",
      data: { orderId, type, date, count }
    }
  });
  return p.data;
};

/**
 *合约资产交易记录
 * @param {string} state 状态,如果为NULL 则表示查询所有 详情请看交易状态说明
 * @param {string} catalog 类别,如果为NULL 则表示查所有类别的 详情请看销售单状态
 * @param {String} lastId
 * @param {String} count
 */
export const QueryUserAssetsTradeList = async function(
  type,
  lastId,
  count,
  state
) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserAssetsTradeList",
      data: { lastId, count }
    }
  });
  return p.data;
};

/**
 * 用户的项目买入信息
 * @param {string} id 记录编号
 */
export const QueryUserProjectBuyTradeDetail = async function(id) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserProjectBuyTradeDetail",
      data: { id }
    }
  });
  return p.data;
};
// QueryUserProjectTradeDetail
export const QueryUserProjectTradeDetail = async function(orderId) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserProjectTradeDetail",
      data: { orderId }
    }
  });
  return p.data;
};
/**
 * 用户的项目卖出详细信息
 * @param {*} id 记录编号
 */
export const QueryUserProjectSaleTradeDetail = async function(id) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserProjectSaleTradeDetail",
      data: { id }
    }
  });
  return p.data;
};

/**
 *用户的投资额排行榜列表信息
 * @param {string} type   0 本月 1 上一个月 2 上两个月 3 上三个月 4上四个月
 */
export const QueryUserInvestAmountRank = async function(type) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/QueryUserInvestAmountRank",
      data: { type }
    }
  });
  return p.data;
};
/**
 * 查询平台的客服电话
 */
export const QueryPlatformPhone = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/CommonService/QueryPlatformPhone",
      data: {}
    }
  });
  return p.data;
};
/**
 * 交易规则
 */
export const QueryPlatformTradeRule = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/CommonService/QueryPlatformTradeRule",
      data: {}
    }
  });
  return p.data;
};
/**
 * 发现页面?
 */
export const QueryShareList = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/CommonService/QueryShareList",
      data: {}
    }
  });
  return p.data;
};
//  /UserService/ValidateUserAccountSendCode
/**
 * 不记得密码短信验证
 * @param {string} code 短信验证码
 */
export const ValidateUserAccountSendCode = async function(code) {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/UserService/ValidateUserAccountSendCode",
      data: { code }
    }
  });
  return p.data;
};

// /CommonService/VialdateUserInfo
/**
 * 验证是否登录绑定
 */
export const VialdateUserInfo = async function() {
  let p;
  p = await Post({
    url: "",
    data: {
      route: "/CommonService/VialdateUserInfo",
      data: {}
    }
  });
  return p.data;
};
