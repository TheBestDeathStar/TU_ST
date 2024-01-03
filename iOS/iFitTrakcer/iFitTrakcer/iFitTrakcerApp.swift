//
//  iFitTrakcerApp.swift
//  iFitTrakcer
//
//  Created by Simeon Tsekov on 20.11.23.
//

import SwiftUI

@main
struct IFitTrakcerApp: App {
    @State var healthKitPermissionsAcquired = false
    var healthKitManager = HealthKitManager()

    var body: some Scene {
        WindowGroup {
            mainView
        }
    }

    @ViewBuilder
    private var mainView: some View {
        if healthKitPermissionsAcquired {
            ContentView()
                .transition(AnyTransition.opacity.animation(.easeInOut(duration: 0.5)))
                .environmentObject(healthKitManager)
        } else {
            splashView
                .transition(AnyTransition.opacity.animation(.easeInOut(duration: 0.5)))
                .onAppear {
                    requestHealthAuthorization()
                }
        }
    }

    private var splashView: some View {
        Text("iFitTracker")
            .font(.system(.title, design: .rounded))
    }

    private func requestHealthAuthorization() {
        Task {
            await healthKitManager.requestAuthorization()
            healthKitPermissionsAcquired.toggle()
        }
    }
}
