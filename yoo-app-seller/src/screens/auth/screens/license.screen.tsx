import {
  Dimensions,
  Linking,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import {Button} from 'react-native-paper';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '@/navigations/auth-navigator';
import RenderHTML, {MixedStyleDeclaration} from 'react-native-render-html';
const {width} = Dimensions.get('window');
const LicenseScreen = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, 'LicenseScreen'>>();
  const policy = `<div>
  <h2><span style="font-weight: bold;">CHÍNH SÁCH QUYỀN RIÊNG TƯ (PRIVACY POLICY)&nbsp;</span></h2>
  <p>Ứng dụng YooLife là một ứng dụng được phát triển với nền tảng IMAX IoT Platform của SONG NAM GROUP JSC. Ứng dụng được thiết kế theo triết lý số hóa các nhu cầu từ cá nhân, gia đình, cộng đồng và xã hội trong mô hình xã hội thông minh. YooLife kết nối người sử dụng/cư dân với ban quản lý/ban quản trị/chính quyền/cộng đồng cư dân, với các dịch vụ tiện ích xã hội.&nbsp;&nbsp;</p>
  <h3><span style="font-weight: bold;">1. Chính sách thu thập dữ liệu&nbsp;&nbsp;</span></h3>
  <p>Bằng cách sử dụng ứng dụng này, bạn đồng ý cho chúng tôi quyền thu thập dữ liệu cá nhân của bạn để phục vụ cho hoạt động đúng đắn của ứng dụng.&nbsp;</p>
  <p>Để phục vụ cho hoạt động đúng đắn của ứng dụng, chúng tôi cần các thông tin bao gồm và không giới hạn như họ tên, ngày tháng năm sinh, địa chỉ cư trú, địa chỉ email, số điện thoại, hình ảnh chân dung, thông tin hóa đơn, thông tin thanh toán, các dữ liệu gián tiếp về hành vi người dùng khi truy cập vào ứng dụng.&nbsp;&nbsp;</p>
  <h3><span style="font-weight: bold;">2. Chính sách bảo vệ dữ liệu&nbsp;</span></h3>
  <p>Các dữ liệu do bạn cung cấp trong ứng dụng được lưu trữ an toàn, bảo mật trên máy chủ của chúng tôi hoặc của bên cung cấp dịch vụ máy chủ cho chúng tôi và không được tiết lộ hay chia sẻ tới bất kỳ bên thứ ba nào khác nếu không có sự đồng ý của bạn.&nbsp;&nbsp;</p>
  <p>Chúng tôi quan tâm đến tính bảo mật thông tin của bạn. Chúng tôi cung cấp các biện pháp bảo vệ vật lý, điện tử và theo thủ tục để bảo vệ thông tin mà chúng tôi xử lý và duy trì. Ví dụ, chúng tôi thực hiện giới hạn quyền truy cập vào các thông tin người dùng đối với các nhân viên và nhà thầu được ủy quyền, những người cần biết các thông tin đó để vận hành, phát triển hoặc cải thiện ứng dụng của chúng tôi. Xin lưu ý rằng, mặc dù chúng tôi luôn nỗ lực cung cấp các biện pháp bảo mật đúng đắn cho dữ liệu của người dùng nhưng không có hệ thống bảo mật nào có thể ngăn chặn tất cả các nguy cơ vi phạm bảo mật tiềm ẩn.&nbsp;</p>
  <h3><span style="font-weight: bold;">3. Thay đổi và điều chỉnh&nbsp;</span></h3>
  <p>Chính sách quyền riêng tư này có thể được cập nhật theo thời gian vì bất cứ lý do gì. Chúng tôi sẽ thông báo tới bạn khi có bất kỳ sự thay đổi nào trong chính sách quyền riêng tư bằng cách đăng chính sách mới tại đây và/hoặc thông báo tới bạn qua email. Bạn nên tham khảo chính sách quyền riêng tư này thường xuyên với bất kỳ thay đổi nào, vì việc tiếp tục sử dụng được coi là chấp thuận tất cả các thay đổi.&nbsp;</p>
  <h3><span style="font-weight: bold;">4. Chấp thuận&nbsp;</span></h3>
  <p>Bằng cách sử dụng ứng dụng, bạn đã chấp thuận với tất cả các nội dung trong chính sách bảo vệ quyền riêng tư này và đồng ý với việc chúng tôi xử lý thông tin của bạn như được qui định trong chính sách này.&nbsp;&nbsp;</p>
  <h3><span style="font-weight: bold;">5. Liên hệ&nbsp;</span></h3>
  <p>Nếu bạn có bất kỳ câu hỏi nào về chính sách quyền riêng tư trong khi sử dụng ứng dụng, hoặc có các câu hỏi về việc triển khai của chúng tôi, vui lòng liên hệ với chúng tôi qua hòm thư điện tử của bộ phận hỗ trợ.</p>
  <br />
  </div>`;
  const tagsStyles = {
    a: {
      textDecorationLine: 'none',
    },
    body: {
      paddingHorizontal: 5,
    },
  };
  const rendererProps = {
    a: {
      onPress: (e: any, url: string) => {
        Linking.openURL(url);
      },
    },
  };
  return (
    <ScrollView style={{backgroundColor: 'white', paddingHorizontal: 10}}>
      <View
        style={{
          flexDirection: 'row',
        }}>
        <Button
          mode="outlined"
          onPress={() => {
            console.log('first');
            navigation.goBack();
          }}>
          Back
        </Button>
      </View>

      <View style={{paddingTop: 10}}>
        <RenderHTML
          ignoredDomTags={['source']}
          baseStyle={{color: 'black'}}
          contentWidth={width}
          source={{html: policy}}
          tagsStyles={
            tagsStyles as Readonly<Record<string, MixedStyleDeclaration>>
          }
          //   renderers={renderers}
          //   defaultTextProps={defaultTextProps}
          renderersProps={rendererProps}
        />
      </View>
    </ScrollView>
  );
};

export default LicenseScreen;

const styles = StyleSheet.create({});
