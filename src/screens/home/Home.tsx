import React, {useState} from 'react';
import {
  View,
  Text,
  useColorScheme,
  SafeAreaView,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import axios from 'axios';
import s from './Home.module.scss';
import {Chart} from '../../components/Chart/Chart';
import {LoginScreenProp} from '../../router/Navigation.interface';
import {Input} from '../../components/Input/Input';
import {Header} from '../../components/Header/Header';
import {Card} from '../../components/Card/Card';

export const Home = () => {
  const navigation = useNavigation<LoginScreenProp>();
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  // grafana dashboard
  const [grafanaURL, setGrafanaURL] = useState('');
  const [grafanaToken, setGrafanaToken] = useState('');
  const [grafanaData, setGrafanaData] = useState();
  const [grafanaChartTitle, setGrafanaChartTitle] = useState();

  const fetchDashboardData = async () => {
    const url = 'prometheus-grafana.prometheus.23.88.104.133.nip.io';
    const api = grafanaToken;
    const grafanaUrl = `http://${url}/api/datasources/proxy/1/api/v1/query_range?`;
    const startTime = Math.floor(Date.now() / 1000 - 3600 * 6);
    const endTime = Math.floor(Date.now() / 1000);
    const step = 30;

    const queryCpu =
      'sum(rate(node_cpu{mode!="idle",mode!="iowait",mode!~"^(?:guest.*)$"}[5m])) BY (instance)';
    const urlValCpu = `${grafanaUrl}query=${queryCpu}&start=${startTime}&end=${endTime}&step=${step}`;

    const queryMem =
      '1 - sum(node_memory_MemAvailable) by (node) / sum(node_memory_MemTotal) by (node)';
    const urlValMem = `${grafanaUrl}query=${queryMem}&start=${startTime}&end=${endTime}&step=${step}`;

    const queryNetwork = 'sum(rate(node_network_receive_bytes[5m])) by (node)';
    const urlValNetwork = `${grafanaUrl}query=${queryNetwork}&start=${startTime}&end=${endTime}&step=${step}`;

    const queryHeadChunks = 'prometheus_tsdb_head_chunks{job="prometheus"}';
    const queryScrapeDuration =
      'topk(5, max(scrape_duration_seconds) by (job))';

    const querySat =
      'sum(node_load1) by (node) / count(node_cpu{mode="system"}) by (node) * 100';
    const urlValSat = `${grafanaUrl}query=${queryScrapeDuration}&start=${startTime}&end=${endTime}&step=${step}`;

    var myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJrIjoiWXlVWTVPU2tqaG0xTmE5NmdobG85QXAyV1BoTDRJU3giLCJuIjoiYWRtaW4iLCJpZCI6MX0=',
    );
    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };
    // NOTE: https example with nip.io won't work beacuse cert is not trusted
    fetch(
      // 'http://prometheus-grafana.prometheus.23.88.104.133.nip.io/api/datasources/proxy/1/api/v1/query_range?query=topk(5%2C%20max(scrape_duration_seconds)%20by%20(job))&start=1634200470&end=1634206070&step=30',
      urlValSat,
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        // store title
        setGrafanaChartTitle(result?.data?.result?.[0]?.metric?.job);
        // store data
        const dataArr: any = [];
        result?.data?.result?.[0]?.values?.forEach((val: any) => {
          val = {x: val[0] * 1000, y: Number(val[1])};
          console.log('val: ', val);
          dataArr.push(val);
        });
        // result?.data?.result?.[0]?.values?.forEach((val: any) => {
        //   val = {x: val[0][1], y: Number(val[0][1])};
        //   dataArr.push(val);
        // });
        setGrafanaData(dataArr);
        // console.log(grafanaData);
      })
      .catch(error => console.log('error', error));
  };
  async function submitGrafanaDashboard() {
    console.log('grafanaURL: ', grafanaURL);
    console.log('grafanaToken: ', grafanaToken);
    // setInterval(fetchDashboardData, 2000);
    fetchDashboardData();
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        {/* <TouchableOpacity
          onPress={() => navigation.navigate({name: 'About', key: 'About'})}
          className={s.nextBtn}>
          <Text className={s.blue}>About Page</Text>
          <Icon name={'rocket'} solid size={30} color="#900" />
        </TouchableOpacity> */}
        <Button
          title="Login page"
          onPress={() => navigation.navigate({name: 'Login', key: 'Login'})}
        />
        <View className={s.addDashboardContainer}>
          <Header text="Add Dashboard 2" />
          <Card>
            <Input
              // label="Email"
              returnKeyType="next"
              value={grafanaURL}
              onChangeText={val => setGrafanaURL(val)}
              // error={!!email.error}
              // errorText={email.error}
              placeholder="Grafana URL"
              autoCapitalize="none"
            />
            <Input
              // label="Email"
              returnKeyType="next"
              value={grafanaToken}
              onChangeText={val => setGrafanaToken(val)}
              // error={!!email.error}
              // errorText={email.error}
              placeholder="Grafana API Token"
              autoCapitalize="none"
            />
            <TouchableOpacity
              onPress={() => submitGrafanaDashboard()}
              className={s.nextBtn}>
              <Text className={s.addDashboardContainerButtton}>Add</Text>
              {/* <Icon name={'plus'} solid size={30} color="#900" /> */}
            </TouchableOpacity>
          </Card>
        </View>
        {grafanaData && (
          <Chart
            x={grafanaData?.map((obj: any) => obj.x)}
            y={grafanaData?.map((obj: any) => obj.y)}
            chartTitle={grafanaChartTitle}
          />
        )}
        {grafanaData && (
          <Chart
            x={grafanaData?.map((obj: any) => obj.x)}
            y={grafanaData?.map((obj: any) => obj.y)}
            chartTitle={grafanaChartTitle}
          />
        )}
        {/* {grafanaData && (
          <Chart
            x={grafanaData?.map((obj: any) => obj.x)}
            y={grafanaData?.map((obj: any) => obj.y)}
            chartTitle={grafanaChartTitle}
          />
        )}  */}
      </ScrollView>
    </SafeAreaView>
  );
};
