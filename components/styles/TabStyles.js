// tabStyles.ts
import { StyleSheet, Platform } from 'react-native';

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: 'rgba(250, 245, 235, 0.95)',
    borderTopWidth: 0,
    height: 70,
    marginHorizontal: 20,
    marginBottom: 18,
    borderRadius: 20,
    position: 'absolute',
    left: 0,
    right: 0,
    alignSelf: 'center',
    paddingBottom: 8,
    paddingTop: 8,
    shadowColor: '#c8b79b',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
  iosShadow: {
    shadowColor: '#b9a88a',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  androidShadow: {
    elevation: 8,
  },
  qrButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#5a4634',
    justifyContent: 'center',
    alignItems: 'center',
    top: -25,
    shadowColor: '#5a4634',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
  },
});

export default styles;
