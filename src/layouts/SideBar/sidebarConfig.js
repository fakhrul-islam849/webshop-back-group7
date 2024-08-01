import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MedicationIcon from '@mui/icons-material/Medication';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import WorkIcon from '@mui/icons-material/Work';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import ContactSupportIcon from '@mui/icons-material/ContactSupport';
import Person3Icon from '@mui/icons-material/Person3';
import AssessmentIcon from '@mui/icons-material/Assessment';
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';

const sidebarConfig = [
    {
        title: 'Dashboard',
        path: '/dashboard',
        icon: <HomeOutlinedIcon />,
        children: []
    },
    {
        title: 'Medicine',
        icon: <VaccinesIcon />,
        children: [
            {
                title: 'Brand',
                path: '/brand'
            },
            {
                title: 'Category',
                path: '/pharmaceutical'
            }
        ]
    },


    {
        title: 'Order',
        path: '/diagnostic',
        icon: <LocalHospitalIcon />,
        children: [
            {
                title: 'Order List',
                path: '/order'
            }
        ]
    },
    {
        title: 'Low Stock Reminder',
        path: '/low-stock',
        icon: <SubscriptionsIcon />
    },
];

export const sidebarConfigForAdvertiser = [
    {
        title: 'Dashboard',
        path: '/advertiser/dashboard',
        icon: <HomeOutlinedIcon />,
        children: []
    },
    {
        title: 'Report Result',
        path: '/advertiser/ad-results',
        icon: <HomeOutlinedIcon />,
        children: []
    }
];

export default sidebarConfig;
