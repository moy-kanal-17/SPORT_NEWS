const router=require("express").Router()

const langsRoute=require("./langs.routes")

const userRoute = require("./users.routes")
const NewsRouter = require("./news.routes")

const MediaRoutes = require('./media.routes')

const ReportRoutes = require('./reports.routes');

const CommentsRoutes = require("./comments.routes")

const viewsRoutes = require('./views.routes')

const LikesRoutes = require('./likes.routes');


router.use("/langs",langsRoute)

router.use("/media",MediaRoutes)

router.use("/comments",CommentsRoutes)

router.use('/likes',LikesRoutes)

router.use("/views",viewsRoutes)

router.use("/reports",ReportRoutes)

router.use("/users",userRoute)

router.use("/news",NewsRouter)




module.exports=router