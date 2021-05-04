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

		This page is used to inform visitors regarding the policies with the collection, use, and disclosure of personal information if anyone decided to use the service.{'\n\n'}

		**Information collection and use**{'\n\n'}

		We don't collect any type of data. We don't store any type of data in a database. We don't use any tracker tool.{'\n\n'}

		For privacy purposes we only store data in your device. The security is based at the the way you use your device or provide access to third parties.{'\n\n'}

		**Log data**{'\n\n'}

		In a case of an error in the application we don't collect any type of log from your device. If you find some error you can contact us using the email at the end of this page or through the contact page.{'\n\n'}

		**Cookies**{'\n\n'}

		Cookies are files with a small amount of data that are commonly used as anonymous unique identifiers. These are sent to your browser from the websites that you visit and are stored on your device's internal memory.{'\n\n'}

		This service does not use these “cookies” explicitly. However, the application may use third party code and libraries that use “cookies” to collect information and improve their services. You have the option to either accept or refuse these cookies and know when a cookie is being sent to your device.{'\n\n'}

		**Service providers**{'\n\n'}

		We may employ third-party companies and individuals due to the following reasons:{'\n\n'}

			* To facilitate our service;{'\n\n'}
			* To provide the service on our behalf;{'\n\n'}
			* To perform service-related services;{'\n\n'}

		We want to inform users of this service that these third parties have access to your Personal Information. The reason is to perform the tasks assigned to them on our behalf. However, they are obligated not to disclose or use the information for any other purpose.{'\n\n'}

		**Security**{'\n\n'}

		We value your trust in providing us any data, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.{'\n\n'}

		**Links to other sites**{'\n\n'}

		This service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by me. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.{'\n\n'}

		**Children’s privacy**{'\n\n'}

		We do not knowingly collect personally identifiable information from anyone.{'\n\n'}

		**Changes to this Privacy Policy**{'\n\n'}

		We may update our Privacy Policy from time to time. Thus, you are advised to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page.{'\n\n'}

		This policy is effective as of 2021-01-01.{'\n\n'}

		**Contact us**{'\n\n'}

		If you have any questions or suggestions about the Privacy Policy, do not hesitate to contact us at [hello.dailly@gmail.com](mailto:hello.dailly@gmail.com).
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
    color: theme.color.black.main,
    textDecorationLine: "underline",
  },
  link: {
    color: theme.color.black.main,
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
