import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Dashboard from "@/pages/Dashboard.vue";
import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Maps from "@/pages/Maps.vue";
import Notifications from "@/pages/Notifications.vue";
import UpgradeToPRO from "@/pages/UpgradeToPRO.vue";
import HouseDeal from "@/pages/HouseDeal.vue";
import NoticeList from "@/pages/NoticeList.vue";
import NoticeDetail from "@/pages/NoticeDetail.vue";
import NoticeAdd from "@/pages/NoticeAdd.vue";
import QnAAdd from "@/pages/QnAAdd.vue";
import QnADetail from "@/pages/QnADetail.vue";
import QnAList from "@/pages/QnAList.vue";
import QnAReply from "@/pages/QnAReply.vue";
import QnAUpdate from "@/pages/QnAUpdate.vue";
import NoticeUpdate from "@/pages/NoticeUpdate.vue";
import SignUp from "@/pages/SignUp.vue";
import LogIn from "@/pages/LogIn.vue";
import FindPassword from "@/pages/FindPassword.vue";
import MyPage from "@/pages/MyPage.vue";

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/dashboard",
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      },
      {
        path: "upgrade",
        name: "Upgrade to PRO",
        component: UpgradeToPRO
      },
      {
        path: "housedeal",
        name: "HouseDeal",
        component: HouseDeal
      },
      {
        path: "noticeList",
        name: "NoticeList",
        component: NoticeList
      },
      {
        path: "noticeDetail",
        name: "NoticeDetail",
        component: NoticeDetail
      },
      {
        path: "noticeAdd",
        name: "NoticeAdd",
        component: NoticeAdd
      },
      {
        path: "noticeUpdate",
        name: "NoticeUpdate",
        component: NoticeUpdate
      },
      {
        path: "qnAAdd",
        name: "QnAAdd",
        component: QnAAdd
      },
      {
        path: "qnADetail",
        name: "QnADetail",
        component: QnADetail
      },
      {
        path: "qnAList",
        name: "QnAList",
        component: QnAList
      },
      {
        path: "qnAReply",
        name: "QnAReply",
        component: QnAReply
      },
      {
        path: "qnAUpdate",
        name: "QnAUpdate",
        component: QnAUpdate
      },
      {
        path: "signup",
        name: "SignUp",
        component: SignUp
      },
      {
        path: "login",
        name: "LogIn",
        component: LogIn
      },
      {
        path: "findpassword",
        name: "FindPassword",
        component: FindPassword
      },
      {
        path: "mypage",
        name: "MyPage",
        component: MyPage
      },
    ]
  }
];

export default routes;
