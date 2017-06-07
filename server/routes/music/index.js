var express = require('express')
var app = express()

// 获取专辑内容
app.use('/album', require('./album'))

// 获取歌手单曲
app.use('/artists', require('./artists'))

// 获取歌手专辑列表
app.use('/artist/album', require('./artist_album'))

// 艺术家-信息
app.use('/artist/desc', require('./artists_desc'))

// 艺术家-mv
app.use('/artist/mv', require('./artists_mv'))

// 获取 banner
app.use('/banner', require('./banner'))

app.use('/check/music', require('./check_music'))


app.use('/comment/music', require('./comment_music'))

app.use('/comment/mv', require('./comment_mv'))


app.use('/comment/album', require('./comment_album'))

app.use('/comment/playlist', require('./comment_playlist'))

// 未知 api
app.use('/comment/like', require('./comment_like'))

app.use('/comment/dj', require('./comment_dj'))

// 签到
app.use('/daily_signin', require('./daily_signin'))

// djradio detail
app.use('/dj/detail', require('./dj_detail'))

// dj主播 radio
app.use('/dj/program', require('./dj_program'))

app.use('/dj/program/detail', require('./dj_program_detail'))

app.use('/dj/sub', require('./dj_sub'))

app.use('/dj/catelist', require('./dj_catelist'))

app.use('/dj/hot', require('./dj_hot'))

// 精选电台
app.use('/dj/recommend', require('./dj_recommend'))

// 精选电台-分类电台
app.use('/dj/recommend/type', require('./dj_recommend_type'))

// 获取动态
app.use('/event', require('./event'))

// 垃圾桶
app.use('/fm_trash', require('./fm_trash'))

app.use('/follow', require('./follow'))

// 喜欢歌曲
app.use('/like', require('./like'))

app.use('/likelist', require('./likelist'))

// 手机登录
app.use('/login/cellphone', require('./loginCellphone'))

// 邮箱登录
app.use('/login', require('./login'))

// 登录刷新
app.use('/login/refresh', require('./login_refresh'))

// 不明 api
app.use('/log/web', require('./logWeb'))

// 获取歌词
app.use('/lyric', require('./lyric'))

// 获取音乐 url
app.use('/music/url', require('./musicUrl'))

// 最新 mv
app.use('/mv/first', require('./mv_first'))

// 播放 mv
app.use('/mv/url', require('./mv_url'))

// mv
app.use('/mv', require('./mv'))

// 私人 FM
app.use('/personal_fm', require('./personal_fm'))

// 推荐歌单
app.use('/personalized', require('./personalized'))

// 推荐dj
app.use('/personalized/djprogram', require('./personalized_djprogram'))

// 推荐新音乐
app.use('/personalized/newsong', require('./personalized_newsong'))

// 独家放送
app.use('/personalized/privatecontent', require('./personalized_privatecontent'))

// 推荐mv
app.use('/personalized/mv', require('./personalized_mv'))

// 获取歌单内列表
app.use('/playlist/detail', require('./playlist_detail'))

// 收藏单曲到歌单,从歌单删除歌曲 op=del,add;pid=歌单id,tracks=歌曲id
app.use('/playlist/tracks', require('./playlist_tracks'))

app.use('/playlist/hot', require('./playlist_hot'))

app.use('/playlist/catlist', require('./playlist_catlist'))

// 推荐节目
app.use('/program/recommend', require('./program_recommend'))

// 获取每日推荐歌曲
app.use('/recommend/songs', require('./recommend_songs'))

// 获取每日推荐歌单
app.use('/recommend/resource', require('./recommend_resource'))

// 取消推荐
app.use('/recommend/dislike', require('./recommend_dislike'))


app.use('/resource/like', require('./resource_like'))

// 搜索
app.use('/search', require('./search'))

// 搜索 hot
app.use('/search/hot', require('./search_hot'))

// 搜索 multimatch
app.use('/search/multimatch', require('./search_multimatch'))

// 搜索 suggest,搜索结果包含单曲,歌手,歌单,mv信息
app.use('/search/suggest', require('./search_suggest'))

// simi ,相似歌单
app.use('/simi/playlist', require('./simi_playlist'))

// simi ,相似歌曲
app.use('/simi/song', require('./simi_song'))

// 相似 mv
app.use('/simi/mv', require('./simi_mv'))

// simi ,相似关注的用户
app.use('/simi/user', require('./simi_user'))

// 相似歌手
app.use('/simi/artist', require('./simi_artists'))

// 获取音乐详情
app.use('/song/detail', require('./song_detail'))

// 新碟上架 http:// music.163.com/#/discover/album/
app.use('/top/album', require('./top_album'))

// 热门歌手 http:// music.163.com/#/discover/artist/
app.use('/top/artists', require('./top_artists'))

app.use('/top/list', require('./top_list'))

app.use('/top/mv', require('./top_mv'))

// 分类歌单
app.use('/top/playlist', require('./top_playlist'))

// 精品歌单
app.use('/top/playlist/highquality', require('./top_playlist_highquality'))

app.use('/top/song', require('./top_songs'))

app.use('/toplist', require('./toplist'))

app.use('/toplist/artist', require('./toplist_artist'))

app.use('/toplist/detail', require('./toplist_detail'))

// 获取用户歌单
app.use('/user/playlist', require('./user_playlist'))

// 获取用户电台
app.use('/user/audio', require('./user_audio'))

// 云盘数据
app.use('/user/cloud', require('./user_cloud'))

// 云盘数据详情???不要使用
app.use('/user/cloud/search', require('./user_cloud_search'))
// 用户动态
app.use('/user/event', require('./user_event'))

app.use('/user/detail', require('./user_detail'))

app.use('/user/dj', require('./user_dj'))

app.use('/user/followeds', require('./user_followeds'))

app.use('/user/follows', require('./user_follows'))

app.use('/user/subcount', require('./user_subcount'))

app.use('/user/record', require('./user_playrecord'))

module.exports = app
