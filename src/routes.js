import Dashboard from "./views/dashboard/Dashboard";
import Profile from "./views/profile/Profile.js";
import Login from "./views/auth/Login.js";
import Forgot from "./views/auth/Forgot";
import Tables from "./views/table/Tables.js";
import UserRole from "./views/user/userRole/UserRole";
import AddUserRole from "./views/user/userRole/components/AddUserRole";
import Users from "./views/user/users/Users";
import AddUsers from "./views/user/users/components/AddUsers";
import UpdateUsers from "./views/user/users/components/UpdateUsers";
import UpdatePrivileges from "./views/user/users/components/UpdatePrivileges";
import UpdateUsersPassword from "./views/user/users/components/UpdateUsersPassword";
import Cms from "./views/cms/Cms";
import AddUpdateCms from "./views/cms/components/AddUpdateCms";
import GameRunner from "./views/game/gameRunner/GameRunner";
import AddUpdateGameRunner from "./views/game/gameRunner/components/AddUpdateGameRunner";
import Category from "./views/game/category/Category";
import AddUpdateCategory from './views/game/category/components/AddUpdateCategory'
import GameMaster from "./views/game/gameMaster/GameMaster";
import AddUpdateGameMaster from "./views/game/gameMaster/components/AddUpdateGameMaster";
import SubGame from "./views/game/subGame/SubGame";
import AddUpdateSubGame from "./views/game/subGame/components/AddUpdateSubGame";
import Draw from "./views/game/draw/Draw";
import AddUpdateDraw from "./views/game/draw/components/AddUpdateDraw";
import Config from './views/config/components/AddUpdateConfig'
import Template from './views/template/Template'
import AddUpdateTemplate from './views/template/components/AddUpdateTemplate'
import Deposit from "./views/deposit/Deposit";
import AddUpdateDeposit from "./views/deposit/components/AddUpdateDeposit";
import Withdrawal from "./views/withdrawal/Withdrawal";
import AddUpdateWithdrawal from "./views/withdrawal/components/AddUpdateWithdrawal";
import Bet from "./views/bet/Bet";
import AddUpdateBet from "./views/bet/components/AddUpdateBet";
import PlayerBet from "./views/bet/components/PlayerBet"
import Transaction from "./views/transaction/Transaction";
import PlayerTransaction from "./views/transaction/components/PlayerTransaction";
import Player from "./views/player/Player";
import AddUpdatePlayer from "./views/player/components/AddUpdatePlayer";
import PlayerDeposit from "./views/player/components/PlayerDeposit";
import PlayerWithdrawal from "./views/player/components/PlayerWithdrawal";
import PlayerLoginHistory from "./views/player/components/PlayerLoginHistory";
import Logs from "./views/logs/Logs";
import CmsBanner from "./views/cmsBanner/CmsBanner";
import AddUpdateCmsBanner from "./views/cmsBanner/components/AddUpdateCmsBanner";

var routes = [
    {
        path: "/index",
        name: "Dashboard",
        icon: "ti-view-grid",
        component: Dashboard,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: false,
        moduleId:[1],
    },
    {
        path: "/user",
        name: "User",
        icon: "ti-user",
        component: Users,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: true,
        moduleId:[2,4],
        subMenu: [
            {
                path: "/role",
                name: "User Role",
                icon: "fa fa-user",
                component: UserRole,
                layout: "/admin",
                isSidebar: true,
                moduleId:2,
            },
            {
                path: "/role/add",
                name: "Add User Role",
                icon: "fa fa-gamepad",
                component: AddUserRole,
                layout: "/admin",
                isSidebar: false,
                moduleId:3,
            },
            {
                path: "/role/edit/:id",
                name: "Edit User Role",
                icon: "fa fa-gamepad",
                component: AddUserRole,
                layout: "/admin",
                isSidebar: false,
                moduleId:3,
            },
            {
                path: "/user",
                name: "User",
                icon: "fa fa-user",
                component: Users,
                layout: "/admin",
                isSidebar: true,
                moduleId:4,
            },
            {
                path: "/user/add",
                name: "Add User",
                icon: "fa fa-gamepad",
                component: AddUsers,
                layout: "/admin",
                isSidebar: false,
                moduleId:5,
            },
            {
                path: "/user/edit/:id",
                name: "Edit User",
                icon: "fa fa-gamepad",
                component: UpdateUsers,
                layout: "/admin",
                isSidebar: false,
                moduleId:5,
            },
            {
                path: "/user/edit/privileges/:id",
                name: "Edit User Privileges",
                icon: "fa fa-gamepad",
                component: UpdatePrivileges,
                layout: "/admin",
                isSidebar: false,
                moduleId:5,
            },
            {
                path: "/user/edit/password/:id",
                name: "Edit User Password",
                icon: "fa fa-gamepad",
                component: UpdateUsersPassword,
                layout: "/admin",
                isSidebar: false,
                moduleId:5,
            },

        ]
    },
    {
        path: "/game",
        name: "Game",
        icon: "ti-game",
        component: GameRunner,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: true,
        moduleId:[12,14,16,18,20],
        subMenu: [
            {
                path: "/category",
                name: "Category",
                icon: "fa fa-gamepad",
                component: Category,
                layout: "/admin",
                isSidebar: true,
                moduleId:12,
            },
            {
                path: "/category/add",
                name: "Add category",
                icon: "fa fa-gamepad",
                component: AddUpdateCategory,
                layout: "/admin",
                isSidebar: false,
                moduleId:13,
            },
            {
                path: "/category/edit/:id",
                name: "Edit category",
                icon: "fa fa-gamepad",
                component: AddUpdateCategory,
                layout: "/admin",
                isSidebar: false,
                moduleId:13,
            },
            {
                path: "/game-master",
                name: "Game Master",
                icon: "fa fa-gamepad",
                component: GameMaster,
                layout: "/admin",
                isSidebar: true,
                moduleId:14,
            },
            {
                path: "/game-master/add",
                name: "Add Game Master",
                icon: "fa fa-gamepad",
                component: AddUpdateGameMaster,
                layout: "/admin",
                isSidebar: false,
                moduleId:15,
            },
            {
                path: "/game-master/edit/:id",
                name: "Edit Game Master",
                icon: "fa fa-gamepad",
                component: AddUpdateGameMaster,
                layout: "/admin",
                isSidebar: false,
                moduleId:15,
            },
            {
                path: "/sub-game",
                name: "Sub Game",
                icon: "fa fa-gamepad",
                component: SubGame,
                layout: "/admin",
                isSidebar: true,
                moduleId:16,
            },
            {
                path: "/sub-game/add",
                name: "Add Sub Game",
                icon: "fa fa-gamepad",
                component: AddUpdateSubGame,
                layout: "/admin",
                isSidebar: false,
                moduleId:17,
            },
            {
                path: "/sub-game/edit/:id",
                name: "Edit Sub Game",
                icon: "fa fa-gamepad",
                component: AddUpdateSubGame,
                layout: "/admin",
                isSidebar: false,
                moduleId:17,
            },
            {
                path: "/game-runner",
                name: "Game Runner",
                icon: "fa fa-gamepad",
                component: GameRunner,
                layout: "/admin",
                isSidebar: true,
                moduleId:18,
            },
            {
                path: "/game-runner/add",
                name: "Add Game Runner",
                icon: "fa fa-gamepad",
                component: AddUpdateGameRunner,
                layout: "/admin",
                isSidebar: false,
                moduleId:19,
            },
            {
                path: "/game-runner/edit/:id",
                name: "Edit Game Runner",
                icon: "fa fa-gamepad",
                component: AddUpdateGameRunner,
                layout: "/admin",
                isSidebar: false,
                moduleId:19,
            },
            {
                path: "/draw",
                name: "Draw",
                icon: "fa fa-gamepad",
                component: Draw,
                layout: "/admin",
                isSidebar: true,
                moduleId:20,
            },
            {
                path: "/draw/edit/:id/:draw_id",
                name: "Draw",
                icon: "fa fa-gamepad",
                component: AddUpdateDraw,
                layout: "/admin",
                isSidebar: false,
                moduleId:21,
            }
        ]
    },
    {
        path: "/cms",
        name: "Cms",
        icon: "ti-star",
        component: Cms,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: false,
        moduleId:[10],
        subMenu: [
            {
                path: "/cms",
                name: "Cms",
                icon: "fa fa-user",
                component: Cms,
                layout: "/admin",
                isSidebar: false,
                moduleId:10,
            },
            {
                path: "/cms/add",
                name: "Add Cms",
                icon: "fa fa-gamepad",
                component: AddUpdateCms,
                layout: "/admin",
                isSidebar: false,
                moduleId:11,
            },
            {
                path: "/cms/edit/:id",
                name: "Edit Cms",
                icon: "fa fa-gamepad",
                component: AddUpdateCms,
                layout: "/admin",
                isSidebar: false,
                moduleId:11,
            },
        ]
    },
    {
        path: "/cms-banner",
        name: "Banner",
        icon: "ti-star",
        component: CmsBanner,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: false,
        moduleId:[10],
        subMenu: [
            {
                path: "/cms-banner",
                name: "Cms Banner",
                icon: "fa fa-user",
                component: CmsBanner,
                layout: "/admin",
                isSidebar: false,
                moduleId:10,
            },
            {
                path: "/cms-banner/add",
                name: "Add Cms Banner",
                icon: "fa fa-gamepad",
                component: AddUpdateCmsBanner,
                layout: "/admin",
                isSidebar: false,
                moduleId:11,
            },
            {
                path: "/cms-banner/edit/:id",
                name: "Edit Cms Banner",
                icon: "fa fa-gamepad",
                component: AddUpdateCmsBanner,
                layout: "/admin",
                isSidebar: false,
                moduleId:11,
            },
        ]
    },
    {
        path: "/player",
        name: "Player",
        icon: "ti-id-badge",
        component:  Player,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: true,
        moduleId:[28,35],
        subMenu: [
            {
                path: "/player",
                name: "Player",
                icon: "ti-id-badge",
                component: Player,
                layout: "/admin",
                isSidebar: true,
                moduleId:28,
            },
            {
                path: "/player/deposit/:id",
                name: "Player deposit",
                icon: "fa fa-gamepad",
                component: PlayerDeposit,
                layout: "/admin",
                isSidebar: false,
                moduleId:32,
            },
            {
                path: "/player/withdrawal/:id",
                name: "Player withdrawal",
                icon: "fa fa-gamepad",
                component: PlayerWithdrawal,
                layout: "/admin",
                isSidebar: false,
                moduleId:33,
            },
            {
                path: "/player/edit/:id",
                name: "View Player",
                icon: "fa fa-gamepad",
                component: AddUpdatePlayer,
                layout: "/admin",
                isSidebar: false,
                moduleId:30,
            },
            {
                path: "/login-history",
                name: "Login History",
                icon: "ti-id-badge",
                component: PlayerLoginHistory,
                layout: "/admin",
                isSidebar: true,
                moduleId:35,
            },
            {
                path: "/login-history/:id",
                name: "Login History",
                icon: "ti-id-badge",
                component: PlayerLoginHistory,
                layout: "/admin",
                isSidebar: false,
                moduleId:35,
            },
        ]
    },
    {
        path: "/bet",
        name: "Bet",
        icon: "ti-receipt",
        component: Bet,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: false,
        moduleId:[37],
        subMenu: [
            {
                path: "/bet",
                name: "Bet",
                icon: "ti-money",
                component: Bet,
                layout: "/admin",
                isSidebar: false,
                moduleId:37,
            },
            {
                path: "/bet/view/:id/:playerId",
                name: "View Bet",
                icon: "ti-money",
                component: AddUpdateBet,
                layout: "/admin",
                isSidebar: false,
                moduleId:37,
            },
            {
                path: "/player-bet/:id",
                name: "Player Bet",
                icon: "ti-layout",
                component: PlayerBet,
                layout: "/admin",
                isSidebar: false,
                moduleId:34,
            },
        ]
    },
    {
        path: "/template",
        name: "Template",
        icon: "ti-layout",
        component: Template,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: false,
        moduleId:[6],
        subMenu: [
            {
                path: "/template",
                name: "Template",
                icon: "ti-layout",
                component: Template,
                layout: "/admin",
                isSidebar: false,
                moduleId:6,
            },
            {
                path: "/template/add/:name",
                name: "Add Template",
                icon: "ti-layout",
                component: AddUpdateTemplate,
                layout: "/admin",
                isSidebar: false,
                moduleId:7,
            },
            {
                path: "/template/edit/:name/:id",
                name: "Edit Template",
                icon: "ti-layout",
                component: AddUpdateTemplate,
                layout: "/admin",
                isSidebar: false,
                moduleId:7,
            },
        ]
    },
    {
        path: "/deposit",
        name: "Deposit",
        icon: "ti-import",
        component: Deposit,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: false,
        moduleId:[23],
        subMenu: [
            {
                path: "/deposit",
                name: "Deposit",
                icon: "ti-money",
                component: Deposit,
                layout: "/admin",
                isSidebar: false,
                moduleId:23,
            },
            {
                path: "/deposit/add",
                name: "Add Deposit",
                icon: "ti-money",
                component: AddUpdateDeposit,
                layout: "/admin",
                isSidebar: false,
                moduleId:24,
            },
            {
                path: "/deposit/edit/:id/:playerId",
                name: "View Deposit",
                icon: "ti-money",
                component: AddUpdateDeposit,
                layout: "/admin",
                isSidebar: false,
                moduleId:24,
            },
        ]
    },
    {
        path: "/withdrawal",
        name: "Withdrawal",
        icon: "ti-export",
        component: Withdrawal,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: false,
        moduleId:[25],
        subMenu: [
            {
                path: "/withdrawal",
                name: "Withdrawal",
                icon: "ti-money",
                component: Withdrawal,
                layout: "/admin",
                isSidebar: false,
                moduleId:25,
            },
            {
                path: "/withdrawal/add",
                name: "Add Withdrawal",
                icon: "ti-money",
                component: AddUpdateWithdrawal,
                layout: "/admin",
                isSidebar: false,
                moduleId:26,
            },
            {
                path: "/withdrawal/edit/:id/:playerId",
                name: "Edit Withdrawal",
                icon: "ti-money",
                component: AddUpdateWithdrawal,
                layout: "/admin",
                isSidebar: false,
                moduleId:26,
            },
        ]
    },
    {
        path: "/transaction",
        name: "Transaction",
        icon: "ti-layout",
        component: Transaction,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: false,
        moduleId:[27],
        subMenu: [
            {
                path: "/transaction",
                name: "Transaction",
                icon: "ti-layout",
                component: Transaction,
                layout: "/admin",
                isSidebar: false,
                moduleId:27,
            },
            {
                path: "/player-transaction/:id",
                name: "Player Transaction",
                icon: "ti-layout",
                component: PlayerTransaction,
                layout: "/admin",
                isSidebar: false,
                moduleId:36,
            },
        ]
    },

    {
        path: "/config",
        name: "Config",
        icon: "ti-settings",
        component: Config,
        layout: "/admin",
        isSidebar: true,
        subMenuDrop: false,
        moduleId:[8],
    },
    {
        path: "/logs",
        name: "Logs",
        icon: "ti-receipt",
        component: Logs,
        layout: "/admin",
        isSidebar: false,
        subMenuDrop: false,
        moduleId:[22],
        subMenu: [
            {
                path: "/logs/:module",
                name: "Logs",
                icon: "ti-receipt",
                component: Logs,
                layout: "/admin",
                isSidebar: false,
                moduleId:22,
            },
            {
                path: "/logs/:module/:id",
                name: "Logs",
                icon: "ti-receipt",
                component: Logs,
                layout: "/admin",
                isSidebar: false,
                moduleId:22,
            }
        ]
    },
    {
        path: "/user-profile",
        name: "Profile",
        icon: "ti-user",
        component: Profile,
        layout: "/admin",
        isSidebar: false,
        subMenuDrop: false,
        moduleId:[1],
    },
    {
        path: "/login",
        name: "Login",
        icon: "ti-plus",
        component: Login,
        layout: "/auth",
        isSidebar: false,
        subMenuDrop: false,
        moduleId:[1],
    },
    {
        path: "/forgot",
        name: "Forgot",
        icon: "ti-pencil-alt",
        component: Forgot,
        layout: "/auth",
        isSidebar: false,
        subMenuDrop: false,
        moduleId:[1],
    },
];
export default routes;
