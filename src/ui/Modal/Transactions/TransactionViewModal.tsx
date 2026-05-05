/* eslint-disable @typescript-eslint/no-explicit-any */
import { Modal } from "antd";
import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { toast } from "sonner";
import ReuseButton from "../../Button/ReuseButton";
import { ITransaction } from "../../../types";
import { IEventOrder } from "../../../types/eventOrder.type";
import { IGearOrder } from "../../../types/gearOrder.type";
import InvoiceDocumentFromAdminSide from "../../../utils/InvoiceDocumentFromAdminSide";
import InvoiceGearFromAdminSide from "../../../utils/InvoiceGearFromAdminSide";
import InvoiceFrafolChoiceFromClientSide from "../../../utils/InvoiceFrafolChoiceFromClientSide";

interface TransactionViewModalProps {
  isViewModalVisible: boolean;
  handleCancel: () => void;
  currentRecord: ITransaction | null;
}

const TransactionViewModal: React.FC<TransactionViewModalProps> = ({
  isViewModalVisible,
  handleCancel,
  currentRecord,
}) => {
  if (!currentRecord) return null;

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  const handleEventInvoiceDownload = () => {
    const order = currentRecord.eventOrderId as IEventOrder;
    if (!order || typeof order === "string") {
      toast.error("Event order data not available");
      return;
    }
    const toastId = toast.loading("Downloading...", { duration: 2000 });
    pdf(<InvoiceDocumentFromAdminSide currentRecord={order} />)
      .toBlob()
      .then((blob: any) => {
        saveAs(blob, `${order.orderId}-invoice.pdf`);
        toast.success("Downloaded successfully!", { id: toastId });
      })
      .catch(() => toast.error("Download failed", { id: toastId }));
  };

  const handleGearInvoiceDownload = () => {
    const order = (currentRecord.gearOrderIds?.[0] ?? null) as IGearOrder | null;
    if (!order || typeof order === "string") {
      toast.error("Gear order data not available");
      return;
    }
    const toastId = toast.loading("Downloading...", { duration: 2000 });
    pdf(<InvoiceGearFromAdminSide currentRecord={order} />)
      .toBlob()
      .then((blob: any) => {
        saveAs(blob, `${order.orderId}-invoice.pdf`);
        toast.success("Downloaded successfully!", { id: toastId });
      })
      .catch(() => toast.error("Download failed", { id: toastId }));
  };

  const handleSubscriptionInvoiceDownload = () => {
    const days = currentRecord.subscriptionDays ?? 365;

    // Derive expiry date from createdAt + subscriptionDays
    const expiryDate = new Date(currentRecord.createdAt);
    expiryDate.setDate(expiryDate.getDate() + days);

    // Build the three objects the invoice component expects
    const myData: any = {
      name: currentRecord.userId?.name || "",
      sureName: "",
      email: currentRecord.userId?.email || "",
      companyName: "",
      address: "",
      town: "",
      country: "",
      ico: "",
      dic: "",
      ic_dph: "",
      phone: "",
    };

    const subscriptionData: any = {
      subscriptionExpiryDate: expiryDate.toISOString(),
    };

    const pack: any = {
      _id: currentRecord._id,
      title: days >= 365 ? "Annual Plan" : days >= 180 ? "Semi-Annual Plan" : `${days}-Day Plan`,
      price: currentRecord.amount,
      duration: days,
    };

    const toastId = toast.loading("Downloading...", { duration: 2000 });
    pdf(
      <InvoiceFrafolChoiceFromClientSide
        myData={myData}
        subscriptionData={subscriptionData}
        pack={pack}
      />
    )
      .toBlob()
      .then((blob: any) => {
        saveAs(blob, `subscription-invoice-${currentRecord._id.slice(-8)}.pdf`);
        toast.success("Downloaded successfully!", { id: toastId });
      })
      .catch(() => toast.error("Download failed", { id: toastId }));
  };

  const paymentType = currentRecord.paymentType;
  const isSubscription = paymentType === "subscription";

  return (
    <Modal
      open={isViewModalVisible}
      onCancel={handleCancel}
      footer={null}
      centered
      className="lg:!w-[600px]"
    >
      <div className="p-5">
        <div className="text-base-color">
          <h3 className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-secondary-color">
            Transaction Details
          </h3>

          <div className="text-xs sm:text-sm lg:text-base mt-3 space-y-2">
            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Date:</span>
              <span>{formatDate(currentRecord.createdAt)}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Payment Type:</span>
              <span className="capitalize">{paymentType}</span>
            </div>

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Client Name:</span>
              <span>{currentRecord.userId?.name || "—"}</span>
            </div>

            {!isSubscription && (
              <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                <span className="font-semibold">Professional Name:</span>
                <span>{currentRecord.serviceProviderId?.name || "—"}</span>
              </div>
            )}

            {isSubscription && (
              <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                <span className="font-semibold">Subscription Days:</span>
                <span>{currentRecord.subscriptionDays ?? "—"} days</span>
              </div>
            )}

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold text-nowrap">Transaction ID:</span>
              <span className="text-wrap max-w-[200px] lg:max-w-[350px] break-all">
                {currentRecord.transactionId}
              </span>
            </div>

            <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
              <span className="font-semibold">Payment Method:</span>
              <span className="capitalize">{currentRecord.paymentMethod}</span>
            </div>

            {!isSubscription && (
              <div className="flex items-center justify-between border-b border-[#E1E1E1] pb-2">
                <span className="font-semibold">Commission:</span>
                <span>${currentRecord.commission?.toFixed(2)}</span>
              </div>
            )}

            <div className="flex items-center justify-between font-bold">
              <span className="text-secondary-color">Amount:</span>
              <span className="text-success">${currentRecord.amount?.toFixed(2)}</span>
            </div>
          </div>

          {paymentType === "event" && (
            <div className="flex items-center justify-center mt-5">
              <ReuseButton
                variant="secondary"
                className="!px-5 !py-4 !w-fit"
                onClick={handleEventInvoiceDownload}
              >
                Download Invoice
              </ReuseButton>
            </div>
          )}

          {paymentType === "gear" && (
            <div className="flex items-center justify-center mt-5">
              <ReuseButton
                variant="secondary"
                className="!px-5 !py-4 !w-fit"
                onClick={handleGearInvoiceDownload}
              >
                Download Invoice
              </ReuseButton>
            </div>
          )}

          {paymentType === "subscription" && (
            <div className="flex items-center justify-center mt-5">
              <ReuseButton
                variant="secondary"
                className="!px-5 !py-4 !w-fit"
                onClick={handleSubscriptionInvoiceDownload}
              >
                Download Invoice
              </ReuseButton>
            </div>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default TransactionViewModal;
