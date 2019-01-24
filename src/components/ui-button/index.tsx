import React from 'react';
import {
    StyleProp,
    StyleSheet,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    ActivityIndicator,
} from 'react-native';
import { Color } from 'styles/variables';
import SpanText from 'components/span-text';

export type UIButtonProps = TouchableOpacityProps & {
    small?: boolean;
    danger?: boolean;
    white?: boolean;
    title: string | number | any;
    type?: 'small';
    textStyle?: StyleProp<TextStyle>;
    loading?: boolean;
};


export default class UIButton extends React.PureComponent<UIButtonProps> {
    public static defaultProps: Partial<UIButtonProps> = {
        onPress: () => console.log('Please attach a method to this component'),
        small: false,
        white: false,
        danger: false,
        loading: false,
        disabled: false,
    };

    public render(): JSX.Element {
        const { onPress, title, loading, disabled } = this.props;

        return (
            <TouchableOpacity onPress={loading ? undefined : onPress} style={this.__btnStyles} disabled={disabled}>
                {loading ? (
                    <ActivityIndicator
                        animating={true}
                        style={StyleSheet.flatten(styles.loading)}
                        color="#FFFFFF"
                    />
                ) : (
                    <SpanText style={this.__btnTitleStyles}>{title}</SpanText>
                )}
            </TouchableOpacity>
        );
    }


    private get __btnStyles() {
        return StyleSheet.flatten([
            styles.button,
            this.props.small && styles.smallBtn,
            this.props.white && styles.whiteBtn,
            this.props.danger && styles.dangerBtn,
            this.props.style,
            this.props.disabled && { backgroundColor: Color.PurpleNoactive },
        ]);
    };


    private get __btnTitleStyles() {
        return StyleSheet.flatten([
            styles.buttonText,
            this.props.small && styles.smallText,
            this.props.white && styles.whiteText,
            this.props.danger && styles.dangerText,
            this.props.textStyle,
            this.props.disabled && { color: Color.Text },
        ]);
    };
}

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        paddingLeft: 10,
        paddingRight: 10,

        shadowRadius: 6,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },


        height: 50,
        width: '100%',
        backgroundColor: Color.Main,
    },
    buttonText: {
        color: Color.White,
        textTransform: 'uppercase',
        fontSize: 16,
    },


    smallBtn: {
        height: 34,
        width: '100%',
    },
    smallText: {
        fontSize: 12,
    },

    dangerBtn: {
        backgroundColor: Color.Danger,
    },
    dangerText: {},

    whiteBtn: {
        borderColor: Color.Gray3,
        borderWidth: 1,
    },
    whiteText: {
        color: Color.DarkPurple,
    },

    loading: {},
});
