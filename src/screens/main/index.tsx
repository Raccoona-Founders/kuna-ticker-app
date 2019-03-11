import React from 'react';
import { View, Animated } from 'react-native';
import { NavigationInjectedProps } from 'react-navigation';
import Constants from 'utils/constants';
import Analitics from 'utils/ga-tracker';
import * as SlideView from 'components/slide-view';
import { tabNavigationRoutes, TabnavRoute, TabBarComponent } from './components/tab-bar';
import PreviewWrapper from './components/preview-wrapper';
import { mainStyles } from './styles';


type MainScreenState = {
    index: number;
    routes: TabnavRoute[];
};

type MainScreenProps = NavigationInjectedProps;


export default class MainScreen extends React.PureComponent<MainScreenProps, MainScreenState> {
    public state: MainScreenState = {
        index: 0,
        routes: tabNavigationRoutes,
    };

    public render(): JSX.Element {
        return (
            <PreviewWrapper>
                <SlideView.TabView
                    bounces={true}
                    navigationState={this.state}
                    renderScene={this.renderScene}
                    renderPager={this.renderPager}
                    style={mainStyles.container}
                    onIndexChange={this.onChangeIndex}
                />
            </PreviewWrapper>
        );
    }

    protected onChangeIndex = (index: number) => {
        this.setState({ index: index }, this.trackScreen);
    };

    protected renderPager = (props: SlideView.SceneRendererProps<TabnavRoute>) => {
        return (
            <>
                <View style={{ height: Constants.IS_IPHONE_X ? 40 : 20 }} />
                <SlideView.PagerScroll {...props} />

                <TabBarComponent
                    navigationState={props.navigationState}
                    position={props.position}
                    onPressTab={(index: number) => this.setState({ index: index }, this.trackScreen)}
                />
            </>
        );
    };

    protected renderScene = (props: SlideView.SceneRendererProps<TabnavRoute> & SlideView.Scene<TabnavRoute>) => {
        const { sceneComponent, index } = props.route;
        const { position } = props;

        const scale = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.9, 1, 0.9],
        });

        return (
            <Animated.View style={{ flex: 1, transform: [{ scale: scale }] }}>
                {React.createElement(sceneComponent, {
                    route: props.route,
                    focused: props.focused,
                })}
            </Animated.View>
        );
    };

    protected trackScreen = () => {
        const { index, routes } = this.state;

        Analitics.trackScreen(`main/${routes[index].key}`, 'MainScreen');
    };
}
