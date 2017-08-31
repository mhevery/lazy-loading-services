# Overview

This project demonstrates how one could lazy load Services.


## Problem

Currently Angular supports lazy loaded of routes. But a service must be either in root NgModule or in route NgModule. If it is in root NgModule than the root NgModule is bloated. If it is in route NgModule than it can not persist state across route NgModule (which is often a requirement).


## Solution

- Create a separate Service NgModule for each lazy loaded chunk which you need. The Service NgModule can have more than one service to inject. Usually a group of related services.
- Export the symbols which you want available from the lazy loaded NgModule (explained in [code](https://github.com/mhevery/lazy-loading-services/blob/master/src/app/service/greet/exports.ts))
- Create a `ModuleInjectorPromise` in the root NgModule pointing to the lazy loaded NgModule
- In the route configuration use the resolver to resolve the `ModuleInjectorPromise` before loading the routing component.
- In the route NgModule create forwarding providers to the lazy loaded `ModuleInjectorPromise`

```
                                  +------------------------------------+
                                  | NgModule: <root>                   |
                                  | Providers:                         |
                                  |    - GreeterModuleInjectorPromise  |
                                  +------------------------------------+
                                         ^                     ^
                                         |                     |
                                         |                     |
+---------------------------------------------------+      +-------------------------+
| NgModule: MyRouteModule                           |      | NgModule: GreeterModule |
| Providers:                                        |      | Providers:              |
|   - Greeter => greeterModuleInjector.get(Greeter) |      |   - Greeter             |
+---------------------------------------------------+      +-------------------------+
```

## Working Example

This repo contains a working example of the implementation. Here is the terminology.

- `Greeter`: A service which needs to be lazy loaded and be a singleton across multiple lazy routes.
- `GreeterModule`: An NgModule which declares the service (along with its own dependencies).
- `WelcomeModule`: A lazy loaded route module.
- `WelcomeComponent`: A lazy loaded router component which has a dependency on lazy loaded `Greeter` service.
- `GreeterModuleInjectorPromise`: A factory which creates `Promise<GreeterModule.Injector>` by lazy loading the `GreeterModule`

See the source code for further explanation of what is going on.

## Running the Example

```
ng install @angular/cli -g 
ng install
ng serve
```