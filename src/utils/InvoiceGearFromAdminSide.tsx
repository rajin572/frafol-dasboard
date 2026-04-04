import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,

} from "@react-pdf/renderer";
import { AllImages } from "../../public/images/AllImages";
import { formatDate } from "./dateFormet";
import { IGearOrder } from "../types";


const styles = StyleSheet.create({
  page: {
    backgroundColor: "#fafafa",
    padding: 30,
  },
  header: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 30,
    color: "#ad2b08",
  },
  headerSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  section: {
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ad2b08",
    marginBottom: 5,
  },
  text: {
    fontSize: 10,
    color: "#2c2c2c",
  },
  textBold: {
    fontSize: 10,
    color: "#2c2c2c",
    fontWeight: "bold",
  },
  table: {
    width: "100%",
    marginTop: 20,
  },
  tableRow: {
    flexDirection: "row",
    borderBottom: "1px solid #ddd",
    padding: "5px 0",
  },
  tableCell: {
    width: "25%",
    textAlign: "center",
    fontSize: 10,
    color: "white",
  },
  tableCellDark: {
    width: "25%",
    textAlign: "center",
    fontSize: 10,
    color: "#2c2c2c",
  },
  highlightText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#ad2b08",
  },
  image: {
    width: 200,
    height: "auto",
    objectFit: "cover",
  },
});

const InvoiceGearFromAdminSide = ({
  currentRecord,
}: {
  currentRecord: IGearOrder;
}) => {
  console.log(currentRecord);

  // Calculate platform commission (service charge)
  const gearPrice = currentRecord.gearMarketplaceId.price || 0;
  const vatPercentage = currentRecord.gearMarketplaceId.vatAmount || 0;
  const mainPrice = currentRecord.gearMarketplaceId.mainPrice || 0;

  // Service charge = mainPrice - (gearPrice + VAT)
  const vatAmount = (gearPrice * vatPercentage) / 100;
  const platformCommission = mainPrice - (gearPrice + vatAmount);

  const sellerIsCompany = !!(currentRecord?.sellerId?.ico);

  return (
    <Document language="sk">
      <Page size="A4" style={styles.page}>
        {/* Invoice Header */}
        <Text style={styles.header}>F A K T Ú R A / I N V O I C E</Text>
        <View style={{ ...styles.headerSection, alignItems: "center" }}>
          <Image src={AllImages.logo} style={styles.image} />
          <View style={styles.section}>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Číslo faktúry / Invoice number:</Text> [{currentRecord.orderId}]
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Dátum vystavenia / Issue date:</Text>{" "}
              {formatDate(currentRecord.createdAt)}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Dátum dodania / Date of service delivery:</Text>{" "}
              {currentRecord.statusTimestamps?.deliveredAt
                ? formatDate(currentRecord.statusTimestamps.deliveredAt)
                : "[dd.mm.yyyy]"}
            </Text>
          </View>
        </View>

        <View style={{ ...styles.headerSection, flexDirection: "column" }}>
          {/* Platform/Admin Information */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>DODÁVATEĽ / SUPPLIER (frafol)</Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Názov firmy / Company name:</Text> FRAFOL s. r. o.
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Adresa sídla / Company address:</Text> Vysokoškolákov 8556/33B, Žilina 010 08
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>IČO / Company ID:</Text>  57 113 904
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>DIČ / Tax ID:</Text> 2122571286
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>IBAN:</Text> SK3483300000002203424224
            </Text>
          </View>

          {/* Seller Information (Client receiving the invoice) */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>ODBERATEĽ / CLIENT (Seller)</Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Meno / Name:</Text> {currentRecord.sellerId.name}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Názov firmy / Company name:</Text>{" "}
              {currentRecord?.sellerId?.companyName || "____"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Adresa / Address:</Text>{" "}
              {currentRecord?.sellerId?.address || "__________"}
            </Text>
            {sellerIsCompany && (
              <>
                <Text style={styles.text}>
                  <Text style={styles.textBold}>IČO / Company ID:</Text> {currentRecord?.sellerId?.ico}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.textBold}>DIČ / Tax ID:</Text> {currentRecord?.sellerId?.dic || "____"}
                </Text>
                <Text style={styles.text}>
                  <Text style={styles.textBold}>IČ DPH / VAT ID:</Text> {currentRecord?.sellerId?.ic_dph || "____"}
                </Text>
              </>
            )}
            <Text style={styles.text}>
              <Text style={styles.textBold}>Email:</Text> {currentRecord.sellerId.email}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Phone:</Text> {currentRecord?.sellerId?.phone || "____"}
            </Text>
          </View>
        </View>

        {/* Order Details */}
        <View style={{ ...styles.section, marginBottom: 20 }}>
          <Text style={styles.subHeader}>DETAILY OBJEDNÁVKY (ORDER DETAILS)</Text>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Produkt (Product):</Text> {currentRecord.gearMarketplaceId.name}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textBold}>ID objednávky (Order ID):</Text> {currentRecord.orderId}
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Kupujúci (Buyer):</Text> {currentRecord.clientId.name} ({currentRecord.clientId.email})
          </Text>
          <Text style={styles.text}>
            <Text style={styles.textBold}>Dodacia adresa (Shipping Address):</Text> {currentRecord.shippingAddress}, {currentRecord.town}, {currentRecord.postCode}
          </Text>
        </View>

        {/* Service Table - Only Platform Commission */}
        <View style={styles.table}>
          <View
            style={{
              ...styles.tableRow,
              backgroundColor: "#ad2b08",
              color: "white",
            }}
          >
            <Text style={styles.tableCell}>SLUŽBA / SERVICE</Text>
            <Text style={styles.tableCell}>MNOŽSTVO / QTY</Text>
            <Text style={styles.tableCell}>CENA / PRICE</Text>
            <Text style={styles.tableCell}>SPOLU / TOTAL</Text>
          </View>

          {/* Platform Service Fee/Commission */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellDark}>
              Servisný poplatok platformy / Platform Service Fee
            </Text>
            <Text style={styles.tableCellDark}>1 ks/pc</Text>
            <Text style={styles.tableCellDark}>€{platformCommission.toFixed(2)}</Text>
            <Text style={styles.tableCellDark}>€{platformCommission.toFixed(2)}</Text>
          </View>
        </View>

        {/* Total Section */}
        <View style={{ ...styles.section, marginTop: 50, alignItems: "flex-end" }}>
          <Text
            style={{
              ...styles.text,
              backgroundColor: "#ad2b08",
              color: "white",
              padding: 8,
              paddingLeft: 15,
              paddingRight: 15,
              marginTop: 5,
              fontWeight: "bold",
              fontSize: 12,
            }}
          >
            <Text>SPOLU / TOTAL: </Text>
            <Text>€{platformCommission.toFixed(2)}</Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={{ ...styles.section, textAlign: "center", marginTop: 80 }}>
          <Text style={styles.text}>
            Táto faktúra bola automaticky vygenerovaná prostredníctvom platformy frafol.sk.
          </Text>
          <Text style={{ ...styles.text, color: "#ad2b08" }}>
            This invoice was automatically generated via the platform frafol.sk.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceGearFromAdminSide;
