import React, { useState, useEffect } from 'react';
import { AsyncStorage, StatusBar } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createDrawerNavigator } from '@react-navigation/drawer'
import NetInfo from '@react-native-community/netinfo'
import * as Permissions from 'expo-permissions'
import * as Location from 'expo-location';
import MainScreen from './screens/MainScreen'
import Info from './screens/Info'
import Settings from './screens/Settings'
import { InfoContext } from './context/InfoContext'

function App() {
	const [latitude, changeLatitude] = useState("Waiting...")
	const [longitude, changeLongitude] = useState("Waiting...")
	const [altitude, changeAltitude] = useState("Waiting...")
	const [locationPermission, changeLocPerm] = useState("Waiting...")
	const [carrier, setCarrier] = useState("Getting Carrier....")
	const [upSpeed] = useState("Waiting...")
	const [downSpeed, setDownSpeed] = useState("Waiting...")
	const [ping] = useState("Waiting....")
	const [theme, changeTheme] = useState("light")

	const [data, changeData] = useState("Getting Data")
	const [heatmapPoints, changeHeatmapPoints] = useState(data)
	const [displayAltitude, changeDisplayAltitude] = useState(altitude)

	let updateTime = 120000 //in milliseconds

	const getTheme = async () => {
		let value = await AsyncStorage.getItem('theme');
		if (value !== null) {
			changeTheme(value);
		}
		else {
			setTheme()
		}
	}

	const setTheme = async () => {
		await AsyncStorage.setItem('theme', theme);
	}

	const getLocation = async () => {
		let { status } = await Permissions.askAsync(Permissions.LOCATION)
		changeLocPerm(status)

		if (status !== 'granted') {
			changeLatitude("Provide Permission")
			changeLongitude("Provide Permission")
			changeAltitude("Provide Permission")
		}

		let options = {
			accuracy: Location.Accuracy.Highest,
			timeInterval: updateTime,
			distanceInterval: 0,
		}

		await Location.watchPositionAsync(options, (data) => {
			changeLatitude(data.coords.latitude)
			changeLongitude(data.coords.longitude)
			changeAltitude(data.coords.altitude)

		}).then(() => {
			if(latitude !== "Waiting..." && longitude !== "Waiting..." && carrier !== "Getting Carrier...." ){
			    var data = {
			        "ping": 100,
			        "latitude": latitude,
			        "longitude": longitude,
			        "isp": carrier,
			        "down": downSpeed === "Waiting..." ? 0 : downSpeed
				}
				
				let url = "https://hotspotsave.herokuapp.com/post?ping=" + data["ping"] + 
						"&latitude=" + data["latitude"] + "&longitude=" + data["longitude"] + 
						"&isp=" + data["isp"] + "&down=" + data["down"]

			    let response = fetch(
			        url,
			        {
			            method: "POST",
			            headers: {
			                "Accept": "application/json",
			                "Content-Type": "application/json"
			            },
			            body: JSON.stringify(data)
			        }
			    ).then(() => console.log(data))
			}
		})
	}

	let speed = 0
	const getDownSpeed = async () => {
		let uri = "https://images.pexels.com/photos/248159/pexels-photo-248159.jpeg?crop=entropy&cs=srgb&dl=road-in-city-during-sunset-248159.jpg&fit=crop&fm=jpg&h=3519&w=5279"
		let size = 2059767
		const start = new Date().getTime()

		fetch(uri, {
			headers: {
				'Cache-Control': 'no-cache, no-store, must-revalidate',
				'Pragma': 'no-cache',
				'Expires': 0
			}
		}).then(() => {
			const end = new Date().getTime()
			let timeTaken = end - start

			speed = (size / 1024) / (timeTaken / 1000)
		}).then(() => {
			setDownSpeed(speed.toFixed(3))
			setTimeout(() => {
				getDownSpeed()
			}, updateTime)
		})
	}

	const getCarrier = async () => {
		NetInfo.fetch().then(data => {
			setCarrier(data.details.carrier)
			return data.details.carrier
		}).then((carr) => {
			getPoints(carr)
		})
	}

	const getPoints = async (carr) => {
		if(carr != "Getting Carrier....") {
			let url = "https://hotspotsave.herokuapp.com/" + carr
			await fetch(url).then(res => res.json()).then((result) => {
				let points = []
				result.map((point) => {
					let obj = {
						latitude: Number(point["latitude"]),
						longitude: Number(point["longitude"]),
						weight: point["down"] === undefined ? 0: Number(point["down"])
					}

					points.push(obj)
				})
				changeData(points)
			})

			setTimeout(() => {
				getPoints(carr)
			}, updateTime)
		}
	}

	useEffect(() => {
		getTheme()
		getCarrier()
		getLocation()
		getDownSpeed()
	}, [])

	const changeLevel = (type) => {
        let newAlt = null
        if(type === "increase") {
            newAlt = displayAltitude + 50
        } else if(type === "decrease") {
            newAlt = displayAltitude - 50
        }
        changeDisplayAltitude(newAlt)
        filterPoints()
	}
	
	const filterPoints = () => {
        const altDiff = 15
        let newPoints = []

        points.map((point) => {
            let diff = Math.abs(point.altitude - displayAltitude)
            if(diff <= altDiff) {
                newPoints.push(point)
            }
        })

        changeHeatmapPoints(newPoints)
    }

	let info = {
		latitude: latitude,
		longitude: longitude,
		altitude: altitude,
		locPerm: locationPermission,
		carrier: carrier,
		upSpeed: upSpeed,
		downSpeed: downSpeed,
		ping: ping,
		theme: theme,
		changeTheme: changeTheme,
		points: heatmapPoints,
		changeLevel: changeLevel
	}

	const Drawer = createDrawerNavigator()
	return (
		<InfoContext.Provider value={info}>
			<StatusBar 
				backgroundColor={theme === "dark" ? "#161616" : "white"}
				barStyle={theme === "dark" ? "default" : "dark-content"}
			/>
			<NavigationContainer theme={theme === 'dark' ? DarkTheme : DefaultTheme}>
				<Drawer.Navigator initialRouteName="Home" >
					<Drawer.Screen name="Home" component={MainScreen} />
					<Drawer.Screen name="Your Info" component={Info} />
					<Drawer.Screen name="Settings" component={Settings} />
				</Drawer.Navigator>
			</NavigationContainer>
		</InfoContext.Provider>
	)
}

export default App