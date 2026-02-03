//* ------------------ICONS------------------
import dashboardLogo from "/images/dashboard-logo/dashboard.svg";
import userLogo from "/images/dashboard-logo/user.svg";
import orderLogo from "/images/dashboard-logo/order.svg";
import gearLogo from "/images/dashboard-logo/gear.svg";
import workshopLogo from "/images/dashboard-logo/workshop.svg";
import approvalsLogo from "/images/dashboard-logo/approvals.svg";
import earningLogo from "/images/dashboard-logo/earning.svg";
import categoryLogo from "/images/dashboard-logo/category.svg";
import reportsLogo from "/images/dashboard-logo/reports.svg";
import messageLogo from "/images/dashboard-logo/message.svg";
import comissionLogo from "/images/dashboard-logo/comission.svg";
import feedbackLogo from "/images/dashboard-logo/feedback.svg";
import documentationLogo from "/images/dashboard-logo/documentation.svg";
import settingsLogo from "/images/dashboard-logo/settings.svg";

//* ------------------IMPORT COMPONENTS------------------
import AdminDashboard from "../pages/Admin/AdminDashboard";
import AdminDeliveryManagement from "../pages/Admin/AdminDeliveryManagement";
import AdminGearMarketplacePage from "../pages/Admin/AdminGearMarketplace";
import AdminWorkshopManagement from "../pages/Admin/AdminWorkshopManagement";
import AdminAllTransaction from "../pages/Admin/AdminAllTransaction";
import AdminAllReports from "../pages/Admin/AdminAllReports";
import AdminCommissionSetupPage from "../pages/Admin/AdminCommissionSetupPage";
import AdminAllFeedback from "../pages/Admin/AdminAllFeedback";
import TermsOfService from "../pages/Common/settings/TermsOfService";
import GDPR from "../pages/Common/settings/GDPR";
import HowOrderingWorks from "../pages/Common/settings/HowOrderingWorks";
import HowItWorks from "../pages/Common/settings/HowItWorks";
import FrameworkAgreement from "../pages/Common/settings/FrameworkAgreement";
import ProfileSettingsPage from "../pages/Common/settings/Profile";
import AdminAllCategories from "../pages/Admin/AdminAllCategories";
import AdminOrderManagement from "../pages/Admin/AdminOrderManagement";
import AdminAllUsers from "../pages/Admin/AdminAllUsers";
import AdminApprovals from "../pages/Admin/AdminApprovals";
import AdminPackageManagement from "../pages/Admin/AdminPackageManagement";
import ConversationPage from "../pages/Common/ConversationPage";
import InteractionMessages from "../pages/Admin/InteractionManagement/InteractionMessages";
import InteractionCommunityForum from "../pages/Admin/InteractionManagement/InteractionCommunityForum";
import AdminAllCupon from "../pages/Admin/AdminAllCupon";
import AdminChoiceManagement from "../pages/Admin/AdminChoiceManagement";
import PrivacyAndPolicy from "../pages/Common/settings/PrivacyAndPolicy";
import WebsiteFunctionality from "../pages/Common/settings/WebsiteFunctionality";
import SearchAlgorithm from "../pages/Common/settings/SearchAlgorithm";
import AdminAllSubscribe from "../pages/Admin/AdminAllSubscribe";
import Notifications from "../pages/Common/Notifications";

export const adminPaths = [
  {
    path: "overview",
    element: <AdminDashboard />,
    key: "overview",
    name: "Dashboard",
    icon: dashboardLogo,
  },
  {
    path: "users-management",
    element: <AdminAllUsers />,
    key: "users-management",
    name: "Users Management",
    icon: userLogo,
  },
  {
    path: "approvals",
    element: <AdminApprovals />,
    key: "approvals",
    name: "Approvals",
    icon: approvalsLogo,
  },
  {
    path: "order-management",
    element: <AdminOrderManagement />,
    key: "order-management",
    name: "Order Management",
    icon: orderLogo,
  },
  {
    path: "delivery-management",
    element: <AdminDeliveryManagement />,
    key: "delivery-management",
    name: "Delivery Management",
    icon: orderLogo,
  },

  {
    path: "gear-marketplace",
    element: <AdminGearMarketplacePage />,
    key: "gear-marketplace",
    name: "Gear Marketplace",
    icon: gearLogo,
  },
  {
    path: "package-management",
    element: <AdminPackageManagement />,
    key: "package-management",
    name: "Package Management",
    icon: workshopLogo,
  },
  {
    path: "workshop-management",
    element: <AdminWorkshopManagement />,
    key: "workshop-management",
    name: "Workshop Management",
    icon: workshopLogo,
  },
  {
    path: "earning",
    element: <AdminAllTransaction />,
    key: "earning",
    name: "Earnings",
    icon: earningLogo,
  },
  {
    path: "categories",
    element: <AdminAllCategories />,
    key: "categories",
    name: "Categories",
    icon: categoryLogo,
  },
  {
    path: "reports",
    element: <AdminAllReports />,
    key: "reports",
    name: "Reports",
    icon: reportsLogo,
  },
  {
    path: "messages",
    element: <ConversationPage />,
    key: "messages",
    name: "Messages",
    icon: messageLogo,
  },
  {
    path: "commission-setup",
    element: <AdminCommissionSetupPage />,
    key: "commission-setup",
    name: "Commission Setup",
    icon: comissionLogo,
  },
  {
    path: "coupon",
    element: <AdminAllCupon />,
    key: "coupon",
    name: "Coupon",
    icon: comissionLogo,
  },
  {
    path: "feedback",
    element: <AdminAllFeedback />,
    key: "feedback",
    name: "Feedback",
    icon: feedbackLogo,
  },
  {
    path: "frafol-choice",
    element: <AdminChoiceManagement />,
    key: "frafol-choice",
    name: "Frafol Choice",
    icon: feedbackLogo,
  },
  {
    path: "newsletter",
    element: <AdminAllSubscribe />,
    key: "newsletter",
    name: "Newsletter",
    icon: feedbackLogo,
  },
  {
    key: "interaction-management",
    name: "Interaction",
    icon: documentationLogo,
    children: [
      {
        key: "message",
        path: "interaction-management/message",
        name: "Message",
        icon: dashboardLogo,
        element: <InteractionMessages />,
      },
      {
        key: "community-form",
        path: "interaction-management/community-form",
        name: "Community Form",
        icon: dashboardLogo,
        element: <InteractionCommunityForum />,
      },
    ],
  },
  {
    key: "documentation",
    name: "Documentation",
    icon: documentationLogo,
    children: [
      {
        key: "privacy-policy",
        path: "documentation/terms-of-service-marketplace",
        name: "Terms of Service Marketplace",
        icon: dashboardLogo,
        element: <PrivacyAndPolicy />,
      },
      {
        key: "terms-of-service",
        path: "documentation/terms-of-service",
        name: "Terms of Service",
        icon: dashboardLogo,
        element: <TermsOfService />,
      },
      {
        key: "gdpr",
        path: "documentation/gdpr",
        name: "GDPR",
        icon: dashboardLogo,
        element: <GDPR />,
      },
      {
        key: "how-ordering-works",
        path: "documentation/how-ordering-works",
        name: "How Ordering Works",
        icon: dashboardLogo,
        element: <HowOrderingWorks />,
      },
      {
        key: "how-it-works",
        path: "documentation/how-it-works",
        name: "How It Works",
        icon: dashboardLogo,
        element: <HowItWorks />,
      },
      {
        key: "framework-agreement",
        path: "documentation/framework-agreement",
        name: "Framework Agreement",
        icon: dashboardLogo,
        element: <FrameworkAgreement />,
      },
      {
        key: "search-algorithm",
        path: "documentation/search-algorithm",
        name: "Search Algorithm",
        icon: dashboardLogo,
        element: <SearchAlgorithm />,
      },
      {
        key: "website-functionality-and-compatibility",
        path: "documentation/website-functionality-and-compatibility",
        name: "Website Functionality",
        icon: dashboardLogo,
        element: <WebsiteFunctionality />,
      },
    ],
  },
  {
    path: "profile",
    element: <ProfileSettingsPage />,
    key: "profile",
    name: "Profile",
    icon: settingsLogo,
  },
  {
    path: "notifications",
    element: <Notifications />,
    key: "notifications",
  },
];
