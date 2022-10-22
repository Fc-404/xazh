<h1> MongoDB 配置 </h1>
[toc]

---

# 环境
> - 树莓派 4b
> - MongoDB v4.4.17

# 数据库
> 数据库名：`xazh`

# 用户
> 用户名：`xazhdba`  
> 测试密码：`xazh`  
> 生产密码：`x4a&zh`  

# 数据集

## users
| 字段 | 类型 | isNull | remark |
| -: | :- | :-: | :- |
_id | ObjectId | NO
name | String | NO | Only
email | String | NO | Only
pswd | String | NO
signIP | String | NO
signDay | Timestamp | NO
icon | String | | MD5
birthday | Date
resume | String

## userstate
| 字段 | 类型 | isNull | remark |
| -: | :- | :-: | :- |
id | ObjectId | NO | relate to users
lastcall | Date |
newlyip | String | | recent ip
ticket | String | | MD5

> `users` 一对一 `userstate`

## pici
| 字段 | 类型 | isNull | remark |
| -: | :- | :-: | :- |
md5 | String | NO | MD5
suffix | String | NO | default 'jpg'
author | ObjectId | NO | author id
uploadtime | Timestamp | NO

## picd
| 字段 | 类型 | isNull | remark |
| -: | :- | :-: | :- |
md5 | String | NO | MD5
index | Int32 | NO | default 0
data | Binary | NO | Binary data

> `pici` 多对一 `picd`