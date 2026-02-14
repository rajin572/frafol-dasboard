
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { IEventOrder } from "../types";
import { AllImages } from "../../public/images/AllImages";
import { formatDate } from "./dateFormet";

Font.register({
  family: "Roboto",
  src: "https://fonts.googleapis.com/css2?family=Playwrite+SK:wght@100..400&display=swap",
});

// Create styles for the PDF using @react-pdf/renderer's StyleSheet
const styles = StyleSheet.create({
  page: {
    backgroundColor: "#efefef",
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
  topRightSection: {
    position: "absolute",
    top: 30,
    right: 30,
    alignItems: "flex-end",
  },
  image: {
    width: 200,
    height: "auto",
    objectFit: "cover",
  },
});

// Invoice document structure - Service Fee Only (Platform/Admin)
const InvoiceDocumentFromAdminSide = ({
  currentRecord,
}: {
  currentRecord: IEventOrder;
}) => {
  // Calculate service fee only
  const subtotal = currentRecord.price || 0;
  const serviceFee = (currentRecord.priceWithServiceFee || 0) - subtotal;

  return (
    <Document>
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
              <Text style={styles.textBold}>Dátum vystavenia / Issue date:</Text> {formatDate(currentRecord.createdAt)}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Dátum dodania služby / Date of service delivery:</Text>{" "}
              {formatDate(currentRecord.deliveryDate || currentRecord.date)}
            </Text>
          </View>
        </View>
        <View style={{ ...styles.headerSection, flexDirection: "column" }}>
          {/* Supplier Information (Platform - frafol) */}
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
              <Text style={styles.textBold}>IBAN:</Text> SK2383300000002403278954
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Telefón / Phone:</Text>  0917 174 707
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>E-mail:</Text>  cvak@frafol.sk
            </Text>
          </View>

          {/* Client Information */}
          <View style={styles.section}>
            <Text style={styles.subHeader}>
              OBERATE / CLIENT (
              {currentRecord.serviceType === "photography"
                ? "Photographer"
                : "Videographer"} /)
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Názov firmy / Company name:</Text>{" "}
              {currentRecord.serviceProviderId.companyName || currentRecord.serviceProviderId.name || "___"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>Adresa sídla / Address:</Text>{" "}
              {currentRecord.serviceProviderId.address || "__________"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>IČO / Company ID:</Text>{" "}
              {currentRecord.serviceProviderId.ico || "__"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>DIČ / Tax ID:</Text> {currentRecord.serviceProviderId.dic || "____"}
            </Text>
            <Text style={styles.text}>
              <Text style={styles.textBold}>IČ DPH / VAT ID (if VAT payer):</Text>{" "}
              {currentRecord.serviceProviderId.ic_dph || "____"}
            </Text>
          </View>
        </View>

        {/* Product/Service Table - Service Fee Only */}
        <View style={styles.table}>
          <View
            style={{
              ...styles.tableRow,
              backgroundColor: "#ad2b08",
              color: "white",
            }}
          >
            <Text style={styles.tableCell}>PRODUKT / PRODUCT</Text>
            <Text style={styles.tableCell}>MNOŽSTVO / QTY</Text>
            <Text style={styles.tableCell}>CENA / PRICE</Text>
            <Text style={styles.tableCell}>SPOLU / TOTAL</Text>
          </View>

          {/* Service Fee Row */}
          <View style={styles.tableRow}>
            <Text style={styles.tableCellDark}>
              Servisný poplatok / Service fee
            </Text>
            <Text style={styles.tableCellDark}>
              1 ks / <Text style={{ color: "#ad2b08" }}>pc</Text>
            </Text>
            <Text style={styles.tableCellDark}>€{serviceFee.toFixed(2)}</Text>
            <Text style={styles.tableCellDark}>€{serviceFee.toFixed(2)}</Text>
          </View>
        </View>

        {/* Subtotal and Total */}
        <View style={{ ...styles.section, marginTop: 50, alignItems: "flex-end" }}>
          <Text style={{ ...styles.text, marginBottom: 5 }}>
            <Text style={{ fontWeight: "bold", color: "#000000" }}>MEDZISÚČET / </Text>
            <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>SUBTOTAL: </Text>
            <Text style={{ fontWeight: "bold", color: "#ad2b08" }}>
              €{serviceFee.toFixed(2)}
            </Text>
          </Text>
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
            <Text>€{serviceFee.toFixed(2)}</Text>
          </Text>
        </View>

        {/* Footer */}
        <View style={{ ...styles.section, textAlign: "center", marginTop: 80 }}>
          <Text style={styles.text}>
            Táto faktúra bola automaticky vygenerovaná prostredníctvom platformy
            frafol.sk.
          </Text>
          <Text style={{ ...styles.text, color: "#ad2b08" }}>
            This invoice was automatically generated via the platform frafol.sk.
          </Text>
        </View>
      </Page>
    </Document>
  );
};

export default InvoiceDocumentFromAdminSide;