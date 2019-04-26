import React from 'react';
import { Animated, View, LayoutChangeEvent, Dimensions } from 'react-native';
import { SpringScrollView, SpringScrollViewPropType, ScrollEvent, Size } from 'react-native-spring-scrollview';
import { NavigationActions } from 'react-navigation';
import { CONSTANTS } from '../../helper';
import ShadeHeader from '../shade-header';
import { cardStyles } from '../shade.style';
import { ShadeCardProps } from './types';

const ANIMATION_DURATION = 400;

const MINIMAL_HEIGHT = Dimensions.get('window').height - 40;

export default class ShadeScrollCard extends React.PureComponent<ShadeCardProps> {
    public state: any = {
        scrollEnabled: true,
        headerHeight: 40,
        footerHeight: 0,
        bottomOffset: 0,
    };

    protected __scrollValue: Animated.Value = new Animated.Value(0);

    public render(): JSX.Element {
        return (
            <Animated.View style={cardStyles.shadeView}>
                {this.__renderHeader()}

                <SpringScrollView{...this.__scrollViewProps} style={cardStyles.scrollView}>
                    <View style={{ height: this.state.headerHeight }} />
                    <View>{this.props.children}</View>
                    <View style={{ height: this.state.footerHeight + this.state.bottomOffset }} />
                </SpringScrollView>

                {this.__renderFooter()}
            </Animated.View>
        );
    }

    protected __renderFooter = (): JSX.Element => {
        const { renderFooter } = this.props;

        return (
            <View style={cardStyles.footer} onLayout={this.__handleFooterLayout}>
                {renderFooter ? renderFooter() : <View />}
            </View>
        );
    };


    protected __renderHeader = (): JSX.Element => {
        return <ShadeHeader position={this.__scrollValue} />;
    };


    protected __handleFooterLayout = (event: LayoutChangeEvent) => {
        this.setState({
            footerHeight: event.nativeEvent.layout.height,
        });
    };

    protected get __scrollViewProps(): SpringScrollViewPropType {
        return {
            contentStyle: {
                minHeight: MINIMAL_HEIGHT
            },
            showsVerticalScrollIndicator: false,
            scrollEnabled: this.state.scrollEnabled,
            onScroll: this._onScrollViewScroll,
            bounces: true,

            // @ts-ignore
            ref: this.props.innerRef,
        };
    }

    protected _onScrollViewScroll = (event: ScrollEvent): void => {
        const { contentOffset } = event.nativeEvent;
        this.__scrollValue.setValue(contentOffset.y);

        if (contentOffset.y > 0) {
            return;
        }

        const value = contentOffset.y;
        if (value < CONSTANTS.SCROLL_TO_CLOSE) {
            const { navigation } = this.props;
            const { index } = navigation.state;

            this._goBack(index, ANIMATION_DURATION);
        }
    };


    protected _goBack = (backFromIndex: number, duration: number = ANIMATION_DURATION) => {
        const { navigation, position, scenes } = this.props;

        const toValue = Math.max(backFromIndex - 1, 0);
        this.setState({ scrollEnabled: false });

        const onCompleteAnimation = (result: Animated.EndResult) => {
            if (false === result.finished) {
                return;
            }

            const backFromScene = scenes.find(s => s.index === toValue + 1);
            if (backFromScene) {
                navigation.dispatch(NavigationActions.back({
                    key: backFromScene.route.key,
                    immediate: true,
                } as any));
            }
        };

        Animated.timing(position, {
            toValue: toValue,
            duration: duration,
            useNativeDriver: position.__isNative || false,
        }).start(onCompleteAnimation);
    };
}
