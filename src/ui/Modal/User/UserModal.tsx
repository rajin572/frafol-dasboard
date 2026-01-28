
import { Modal } from "antd";
import { AllImages } from "../../../../public/images/AllImages";
import { FaStar } from "react-icons/fa";
import ReuseButton from "../../Button/ReuseButton";
import { IUser } from "../../../types";
import { getImageUrl } from "../../../helpers/config/envConfig";
interface UserModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: IUser | null;
  activeTab: string;
  showViewPortfolioModal: () => void;
}
const UserModal: React.FC<UserModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
  activeTab,
  showViewPortfolioModal,
}) => {
  const serverUrl = getImageUrl();
  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="max-w-[1000px] !w-[90%] lg:!w-[900px]"
    >
      <div className="p-5">
        <div className="text-base-color">
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold  text-center text-secondary-color">
            User Details
          </h3>
          <p className="text-sm sm:text-base lg:text-lg text-center mt-2 text-[#989898]">
            See all details about {currentRecord?.name}
          </p>
          <div className="flex flex-col justify-center items-center gap-2 mt-5">
            {/* Avatar */}
            <div className="border rounded-full">
              <img
                src={currentRecord?.profileImage ? serverUrl + currentRecord?.profileImage : AllImages.profile}
                alt={currentRecord?.name}
                className="w-14 h-14 object-cover rounded-full"
              />
            </div>
            {(activeTab === "professional" && currentRecord?.hasActiveSubscription) && (
              <div className="mt-2 flex items-center gap-1 bg-secondary-color px-2 py-1 rounded-full z-20 shadow-md">
                <img
                  src={AllImages?.batch}
                  width={16}
                  height={16}
                  alt="Frafol Choice Badge"
                  className="size-2.5 sm:size-3 lg:size-4"
                />
                <p className="text-white text-[8px] sm:text-[10px] lg:text-xs font-bold">
                  Frafol Choice
                </p>
              </div>
            )}
            {activeTab === "professional" && (
              <p className="text-xs sm:text-sm lg:text-base flex items-center gap-1">
                <FaStar className="text-yellow-400" /> {currentRecord?.averageRating?.toFixed(1)} ({currentRecord?.totalReview} Reviews)
              </p>
            )}
            <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-secondary-color mt-1">
              {currentRecord?.name}
            </h2>
            {activeTab === "professional" && (
              <div className="">
                <p className="text-sm sm:text-base lg:text-lg mt-1 font-semibold capitalize text-center">
                  {currentRecord?.role === "both" ? "Photographer & Videographer" : currentRecord?.role}
                </p>
              </div>
            )}
          </div>
          {activeTab === "professional" && (
            <div className="">
              <p className="text-sm sm:text-base lg:text-lg mt-1">
                {currentRecord?.profileId?.about}
              </p>
            </div>
          )}

          <div className="mt-5">
            {activeTab === "professional" ? (
              <div className="text-lg grid grid-cols-1 bg-secondary-color/5 p-3 rounded lg:grid-cols-2 mt-3">
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Email:</span>
                  <span>{currentRecord?.email}</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Phone:</span>
                  <span>{currentRecord?.phone}</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Hourly Rate:</span>
                  <span>{currentRecord?.minHourlyRate}€ - {currentRecord?.maxHourlyRate}€</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Location:</span>
                  <span>{currentRecord?.address}</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Town:</span>
                  <span>{currentRecord?.town}</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Country:</span>
                  <span>{currentRecord?.country}</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">Zip Code:</span>
                  <span>{currentRecord?.zipCode}</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">ICO:</span>
                  <span>{currentRecord?.ico}</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">DIC:</span>
                  <span>{currentRecord?.dic}</span>
                </div>
                <div className="flex items-center  gap-2 mb-2">
                  <span className="font-medium">IC DPH:</span>
                  <span>{currentRecord?.ic_dph}</span>
                </div>
              </div>
            ) : (
              <div className="text-lg  mt-3">
                <div className="text-lg grid grid-cols-1 bg-secondary-color/5 p-3 rounded lg:grid-cols-2 mt-3">
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Email:</span>
                    <span>{currentRecord?.email}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Phone:</span>
                    <span>{currentRecord?.phone}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Location:</span>
                    <span>{currentRecord?.address}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Town:</span>
                    <span>{currentRecord?.town}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Country:</span>
                    <span>{currentRecord?.country}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">Zip Code:</span>
                    <span>{currentRecord?.zipCode}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">ICO:</span>
                    <span>{currentRecord?.ico}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">DIC:</span>
                    <span>{currentRecord?.dic}</span>
                  </div>
                  <div className="flex items-center  gap-2 mb-2">
                    <span className="font-medium">IC DPH:</span>
                    <span>{currentRecord?.ic_dph}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
          {
            activeTab === "professional" && (
              <div className="flex justify-center items-center mt-5">
                <ReuseButton
                  variant="secondary"
                  onClick={() => showViewPortfolioModal()}
                >
                  View Portfolio
                </ReuseButton>
              </div>
            )
          }
        </div>
      </div>
    </Modal>
  );
};

export default UserModal;
