import { TouchableOpacity, View } from 'react-native'
import React, { forwardRef, useImperativeHandle, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'

export interface ReviewStarsSelectProps {
  initialStars?: number;
  editable?: boolean;
  size?: number;
  style?: any;
};

export interface ReviewStarsSelectRef {
  getStars: () => number;
  setStars: (stars: number) => void;
}

export const ReviewStarsSelect = forwardRef<ReviewStarsSelectRef, ReviewStarsSelectProps>((props, ref) => {
  const [stars, setStars] = useState(props?.initialStars ?? 0);

  useImperativeHandle(ref, () => ({
    getStars() {
      return stars;
    },
    setStars(stars: number) {
      setStars(stars);
    }
  }));

  const onStarPress = (star: number) => {
    if (props.editable !== false) {
      setStars(star);
    }
  }

  return (
    <View style={[{ flexDirection: 'row' }, props.style]} >
      {
        [1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity activeOpacity={1} key={star} onPress={() => onStarPress(star)}>
            <FontAwesome
              key={star}
              name={star <= stars ? 'star' : 'star-o'}
              size={props.size ?? 36}
              color="black"
              style={{ marginRight: 4 }}
            />
          </TouchableOpacity>
        ))
      }
    </View>
  )
});

