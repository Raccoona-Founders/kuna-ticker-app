import React from 'react';
import { Animated, View, LayoutChangeEvent } from 'react-native';
import { SpringScrollView, SpringScrollViewPropType, ScrollEvent } from 'react-native-spring-scrollview';
import { NavigationActions } from 'react-navigation';
import ShadeHeader from '../shade-header';
import { cardStyles } from '../shade.style';
import { ShadeCardProps } from './types';

const ANIMATION_DURATION = 400;

export default class ShadeScrollCard extends React.PureComponent<ShadeCardProps> {
    public state = {
        scrollEnabled: true,
        footerHeight: 0,
    };

    public constructor(props: ShadeCardProps) {
        super(props);
    }

    public render(): JSX.Element {
        const { withBrow = true } = this.props;

        return (
            <Animated.View style={cardStyles.shadeView}>
                {withBrow ? <ShadeHeader opacity={0} /> : undefined}

                <SpringScrollView {...this.__scrollViewProps} style={cardStyles.scrollView}>
                    <View style={[cardStyles.innerContent, { paddingTop: withBrow ? 40 : 0 }, this.props.style]}>
                        {this.props.children}
                    </View>

                    <View style={{ height: this.state.footerHeight }} />
                </SpringScrollView>

                <View style={cardStyles.footer} onLayout={this.__handleFooterLayout}>
                    {this.__renderFooter()}
                </View>
            </Animated.View>
        );
    }

    protected __renderFooter = (): JSX.Element => {
        const { renderFooter } = this.props;

        return renderFooter ? renderFooter() : <View />;
    };


    protected __handleFooterLayout = (event: LayoutChangeEvent) => {
        this.setState({
            footerHeight: event.nativeEvent.layout.height,
        });
    };


    protected get __scrollViewProps(): SpringScrollViewPropType {
        return {
            contentStyle: {
                minHeight: '100%',
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
        if (contentOffset.y > 0) {
            return;
        }

        const value = contentOffset.y;
        if (value < -100) {
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
