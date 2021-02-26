// 测试MongoDB数据库*********************************************************************

const md5 = require('blueimp-md5')
// 1
// 引入mongoose
const mongoose = require('mongoose')
// 连接指定数据库
mongoose.connect('mongodb://localhost/hz_test',{useNewUrlParser: true, useUnifiedTopology: true })
// 获取连接对象
const conn=mongoose.connection
// 绑定
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open',function () { //连接成功回调
  console.log('数据库连接成功')
})
// 解决useFindAndModify 的弃用警告
mongoose.set('useFindAndModify', false)

// 2
// 对应特定集合的Model
// 用户文档结构
const userSchema = mongoose.Schema({ //属性名:属性值的类型，是否是必须的:默认值
  username:{type:String, required:true}, //用户名
  password:{type:String, required:true}, //密码
  usertype:{type:String, required:true},  //用户类型:hz/hj
  header:{type:String} //用户头像 非必须
})

// 定义Model(与集合对应，可以操作集合)
const UserModel = mongoose.model('user', userSchema) //集合名users

// 3
// 通过Model或其实例对几何数据进行增删改查CRUD  save() findOne() findByIdAndUpdate() remove()

// 增
function testSave() {
  // 创建UserModel的实例
  const userModel = new UserModel({
    username:'Tenghu',
    password:md5('456'),
    usertype:'hj'
  })
  // 调用save()保存
  userModel.save(function (error,user) {
    console.log('save()',error,user)
  })
}

// testSave()


// 查 find() findOne()
function testFind() {
  // 查询多个
  UserModel.find(function (error,users) {
    console.log('find()',error,users)
  })
  // 查询一个
  UserModel.findOne({_id:'6038afa6b85d1c2124a43aa5'},function (error,user) {
    console.log('findOne()',error,user)
  })
}

// testFind()

// 改
function testUpdate() {
  UserModel.findOneAndUpdate({_id: "6038b692597c470a9c4d4086"},{username:'Suolong',usertype: "hz"},function (error,oldUser) {
    console.log('findByIdAndUpdate()', error, oldUser)
  })
}

// testUpdate()

// 删
function testRemove() {
  UserModel.remove({username:'Namei'},function (err,doc) {
    console.log("testDelete()",err, doc)  //{n:1/0 , ok:1}
  })
}

testRemove()

