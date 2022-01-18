import { combineReducers } from 'redux';

import { AuthReducers } from './AuthReducers';
import { UserRoleReducers } from '../../views/user/userRole/slice/UserRoleReducers';
import { UsersReducers } from '../../views/user/users/slice/UsersReducers';
import { CategoryReducers } from '../../views/game/category/slice/CategoryReducers';
import { GameRunnerReducers } from '../../views/game/gameRunner/slice/GameRunnerReducers';
import { GameMasterReducers } from '../../views/game/gameMaster/slice/GameMasterReducers';
import { SubGameReducers } from '../../views/game/subGame/slice/SubGameReducers';
import { CmsReducers } from '../../views/cms/slice/CmsReducers';
import { CmsBannerReducers } from '../../views/cmsBanner/slice/CmsBannerReducers';
import { ConfigReducers } from '../../views/config/slice/ConfigReducers';
import { EmailTemplateReducers } from '../../views/template/slice/EmailTemplateReducers';
import { SmsTemplateReducers } from '../../views/template/slice/SmsTemplateReducers';
import { LogsReducers } from '../../views/logs/slice/LogsReducers';
import { DrawReducers } from '../../views/game/draw/slice/DrawReducers';
import { DepositReducers } from '../../views/deposit/slice/DepositReducers';
import { WithdrawalReducers } from '../../views/withdrawal/slice/WithdrawalReducers';
import { DashboardReducers } from '../../views/dashboard/slice/DashboardReducers';
import { PlayerReducers } from '../../views/player/slice/PlayerReducers';
import { BetReducers } from '../../views/bet/slice/BetReducers';
import { TransactionReducers } from '../../views/transaction/slice/TransactionReducers';

//import { alert } from './alert.reducer';

const rootReducer = combineReducers({
    AuthReducers,
    UserRoleReducers,
    UsersReducers,
    CmsReducers,
    CmsBannerReducers,
    GameRunnerReducers,
    CategoryReducers,
    GameMasterReducers,
    SubGameReducers,
    ConfigReducers,
    EmailTemplateReducers,
    SmsTemplateReducers,
    LogsReducers,
    DepositReducers,
    WithdrawalReducers,
    DrawReducers,
    DashboardReducers,
    PlayerReducers,
    BetReducers,
    TransactionReducers,

});

export default rootReducer;
