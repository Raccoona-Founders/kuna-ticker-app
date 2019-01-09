import { PureComponent, ReactNode, ComponentType } from 'react';
import { Animated, StyleProp, ViewStyle, EasingFunction } from 'react-native';

export type Key = { key: string };
export type RouteBase = Key & { testID?: string };
export type Route<T extends RouteBase = RouteBase> = T;

export type NavigationState<T extends Key> = {
    index: number;
    routes: T[];
}

export type Scene<T> = {
    route: T;
    index: number;
    focused: boolean;
}

export type Layout = {
    height: number;
    width: number;
}

export type SceneRendererProps<T extends RouteBase = RouteBase> = {
    layout: Layout & {
        measured: boolean;
    };
    navigationState: NavigationState<T>;
    position: Animated.Value;
    offsetX: Animated.Value;
    panX: Animated.Value;
    jumpTo: (key: string) => void;

    getLastPosition: () => number;
    subscribe: (event: SubscriptionName, callback: () => void) => { remove: () => void };
}

export type SubscriptionName = 'reset' | 'position';

export type TransitionProps = {
    progress: number;
}

export type NavigationTransitionSpec = {
    duration?: number;
    // An easing function from `Easing`.
    easing?: EasingFunction;
    // A timing function such as `Animated.timing`.
    timing?: (value: Animated.Value, config: any) => any;
}

export type TransitionConfigurator = (
    currentTransitionProps: TransitionProps,
    nextTransitionProps: TransitionProps,
) => NavigationTransitionSpec;

export type PagerProps = {
    configureTransition?: TransitionConfigurator;
    animationEnabled?: boolean;
    swipeEnabled?: boolean;
    swipeDistanceThreshold?: number;
    swipeVelocityThreshold?: number;
    children?: ReactNode;
}

export type TabViewProps<T extends RouteBase = RouteBase> = PagerProps & {
    navigationState: NavigationState<T>;
    onIndexChange: (index: number) => void;
    onPositionChange?: (props: { value: number }) => void;
    initialLayout?: Layout;
    canJumpToTab?: (route: T) => boolean;
    renderPager?: (props: SceneRendererProps<T> & PagerProps & any) => ReactNode;
    renderScene: (props: SceneRendererProps<T> & Scene<T>) => ReactNode;
    lazy?: boolean;
    style?: StyleProp<ViewStyle>;
    useNativeDriver?: boolean;
    bounces?: boolean;
}

export type GestureEvent = {
    nativeEvent: {
        changedTouches: any[];
        identifier: number;
        locationX: number;
        locationY: number;
        pageX: number;
        pageY: number;
        target: number;
        timestamp: number;
        touches: any[];
    }
}

export type GestureState = {
    stateID: number;
    moveX: number;
    moveY: number;
    x0: number;
    y0: number;
    dx: number;
    dy: number;
    vx: number;
    vy: number;
    numberActiveTouches: number;
}

export type GestureHandler = (event: GestureEvent, state: GestureState) => void;

export type ScrollEvent = {
    nativeEvent: {
        contentOffset: {
            x: number;
            y: number;
        },
        contentSize: {
            height: number;
            width: number;
        },
    }
}

export type PagerScrollProps<T extends RouteBase = RouteBase> = any & SceneRendererProps<T> & {
    animationEnabled?: boolean;
    swipeEnabled?: boolean;
    children?: ReactNode;
}

export type PageScrollEvent = {
    nativeEvent: {
        position: number;
        offset: number;
    }
}

export type PageScrollState = 'dragging' | 'settling' | 'idle';

