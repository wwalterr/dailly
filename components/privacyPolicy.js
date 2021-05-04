import React from "react";

import { StyleSheet, ScrollView } from "react-native";

import Markdown from "react-native-simple-markdown";

import theme from "../theme";

const PrivacyPolicy = () => {
  return (
    <ScrollView
      horizontal={false}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      style={styles.containerMarkdown}
    >
      <Markdown styles={markdownStyles}>
		**Privacy Policy**{'\n\n'}

		This service is provided at no cost and is intended for use as is.{'\n\n'}

		This page is used to inform visitors regarding the policies with the collection, use, and disclosure of Personal Information if anyone decided to use the service.{'\n\n'}

		If you choose to use the service, then you agree to the collection and use of information in relation to this policy. The Personal Information that I collect is used for providing and improving the service. I will not use or share your information with anyone except as described in this Privacy Policy.{'\n\n'}

		The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at Dailly unless otherwise defined in this Privacy Policy.{'\n\n\n'}

		**Information Collection and Use**{'\n\n'}

		For a better experience, while using our service, I may require you to provide us with certain personally identifiable information. The information that I request will be retained on your device and is not collected by me in any way.{'\n\n'}

		The app does use third party services that may collect information used to identify you.{'\n\n'}

		Link to privacy policy of third party service providers used by the app{'\n\n'}

		*   [Google Play Services](https://www.google.com/policies/privacy/){'\n\n\n'}

		**Log Data**{'\n\n'}

		I want to inform you that whenever you use the service, in a case of an error in the app I collect data and information (through third party products) on your phone called Log Data. This Log Data may include information such as your device Internet Protocol (“IP”) address, device name, operating system version, the configuration of the app when utilizing the service, the time and date of your use of the service, and other statistics.{'\n\n\n'}

		**Cookies**{'\n\n'}

		Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.{'\n\n'}

		This service does not use these “cookies” explicitly. However, the app may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device. If you choose to refuse our cookies, you may not be able to use some portions of this service.{'\n\n\n'}

		**Service Providers**{'\n\n'}

		I may employ third-party companies and individuals due to the following reasons:{'\n\n'}

		*   To facilitate our service;{'\n\n'}
		*   To provide the service on our behalf;{'\n\n'}
		*   To perform service-related services; or{'\n\n'}
		*   To assist us in analyzing how our service is used.{'\n\n'}

		I want to inform users of this service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.{'\n\n\n'}

		**Security**{'\n\n'}

		I value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and I cannot guarantee its absolute security.{'\n\n\n'}

		**Links to Other Sites**{'\n\n'}

		This service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, I strongly advise you to review the Privacy Policy of these websites. I have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.{'\n\n\n'}

		**Children’s Privacy**{'\n\n'}

		These services do not address anyone under the age of 13. I do not knowingly collect personally identifiable information from children under 13 years of age. In the case I discover that a child under 13 has provided me with personal information, I immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact me so that I will be able to do necessary actions.{'\n\n\n'}

		**Changes to This Privacy Policy**{'\n\n'}

		I may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. I will notify you of any changes by posting the new Privacy Policy on this page.{'\n\n'}

		This policy is effective as of 2021-01-01.{'\n\n\n'}

		**Contact Us**

		If you have any questions or suggestions about the Privacy Policy, do not hesitate to contact me at [hello.dailly@gmail.com](mailto:hello.dailly@gmail.com).
	  </Markdown>
    </ScrollView>
  );
};

const markdownStyles = {
  text: {
    fontFamily: "Inter_400Regular",
    fontSize: 14,
    color: theme.color.black.main,
	marginBottom: 4
  },
  strong: {
    fontFamily: "Inter_400Regular",
	fontSize: 14,
    fontWeight: "bold",
    color: theme.color.black.main,
    marginTop: 16,
    marginBottom: 6,
  },
  mailTo: {
    color: theme.color.blue.main,
    textDecorationLine: "underline",
  },
  link: {
    color: theme.color.blue.main,
    textDecorationLine: "underline",
  },
};

const styles = StyleSheet.create({
  containerMarkdown: {
    paddingHorizontal: 32,
    marginBottom: 16,
  },
});

export default PrivacyPolicy;
