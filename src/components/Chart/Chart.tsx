import React, {FC, useState, useRef, useEffect} from 'react';
import {View, Text, Dimensions, Animated, LayoutAnimation} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import s from './Chart.module.scss';

interface Props {
  x: number[];
  y: number[];
  chartTitle?: string;
}

export const Chart: FC<Props> = ({x, y, chartTitle}) => {
  const [progressTime, setProgressTime] = useState(0);

  // Define a initial value for chart
  const animationValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // Define animation for chart
    Animated.timing(animationValue, {
      toValue: 0.65, // Value to graph
      duration: 5000, // Duration for animation
      useNativeDriver: true,
    }).start();

    // Listen the animation variable and update chart variable
    animationValue.addListener(({value}) => {
      console.log('🚀 ~ animationValue.addListener ~ value', value);
      setProgressTime(value);
    });
  }, [animationValue, y]);

  // experiment
  const [showPointsGraph] = useState(7);
  const [startY, setStartY] = useState(0);
  const [endY, setEndY] = useState(showPointsGraph);
  const [loadingY, setloadingY] = useState(false);
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (endY < y.length - showPointsGraph) {
        setloadingY(true);
        setStartY(startY + showPointsGraph);
        setEndY(endY + showPointsGraph);
        setloadingY(false);
      }
    }, 1000);

    return () => clearInterval(intervalId); //This is important
  }, [showPointsGraph, endY, startY, y.length]);

  return (
    <View className={s.chartContainer}>
      <View className={s.chartTitleContainer}>
        <Text className={s.chartTitle}>{chartTitle}</Text>
        <View className={s.chartTitleLabel} />
      </View>
      <LineChart
        data={{
          // legend: [
          //   'kubernetes-api-server',
          //   'Fake Data 1',
          //   'Fake Data 2',
          //   'Fake Data 3',
          // ],
          labels: x.slice(startY, endY - 3).map((milliseconds, i) => {
            let date = new Date(milliseconds);
            // if (i === 0) {
            //   return date.toISOString().split('T')[0]?.replaceAll('-', '.');
            // }
            return date.toLocaleTimeString().replace(/:\d+ /, ' ');
          }),
          datasets: [
            {
              data: !loadingY ? y?.slice(startY, endY) : [0, 0, 0],
              // data: [
              //   // startY,
              //   Math.random(),
              //   Math.random(),
              //   Math.random(),
              //   Math.random(),
              //   Math.random(),
              //   Math.random(),
              //   Math.random(),
              //   // endY,
              //   // Math.random() * 100 * progressTime,
              //   // Math.random() * 100 * progressTime,
              //   // Math.random() * 100 * progressTime,
              //   // Math.random() * 100 * progressTime,
              //   // Math.random() * 100 * progressTime,
              //   // Math.random() * 100 * progressTime,
              //   // Math.random() * 100 * progressTime,
              //   // Math.random() * 100 * progressTime,
              //   // Math.random() * 100 * progressTime,
              //   // Math.random() * 100 * progressTime,
              // ],
            },
            {
              data: !loadingY
                ? y?.slice(startY, endY)?.map(num => num + Math.random() / 100)
                : [0, 0, 0],
              strokeWidth: 1.5,
              // color: (opacity = 1) => `rgba(205,125,215, ${1})`, // optional
              color: () => '#A35D0F',
            },
            {
              data: !loadingY
                ? y
                    ?.slice(startY, endY)
                    ?.map(num => num + Math.random() / 100 - 0.009)
                : [0, 0, 0],
              strokeWidth: 1.5,
              // color: (opacity = 1) => `rgba(205,125,215, ${1})`, // optional
              color: () => '#FB552E',
            },
            {
              data: !loadingY
                ? y?.slice(startY, endY)?.map(num => num + Math.random() / 100)
                : [0, 0, 0],
              strokeWidth: 1.5,
              // color: (opacity = 1) => `rgba(205,125,215, ${1})`, // optional
              color: () => '#23799E',
            },
          ],
        }}
        // accessor="population"
        //
        // formatYLabel={(yLabel: any) =>
        //   Math.round((yLabel / progressTime + Number.EPSILON) * 100) / 100
        // }
        // formatXLabel={(xLabel: any) =>
        //   new Date(xLabel).toISOString().split('T')[0]
        // }
        // hideLegend={true}
        //
        width={Dimensions.get('window').width} // from react-native
        height={220}
        // yAxisLabel="$"
        yAxisSuffix=" ms"
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#e26a00',
          backgroundGradientFrom: '#fb8c00',
          backgroundGradientTo: '#ffa726',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForDots: {
            r: '0.5',
            // strokeWidth: '2',
            // stroke: '#ffa726',
          },
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};
