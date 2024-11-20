import {DefineComponent, defineComponent, h} from 'vue';

export const redoIcon: DefineComponent = defineComponent({
    name: 'RedoIcon',
    render() {
        return h('span', {role: 'img', class: 'anticon'}, [
            h('svg', {width: '1em', height: '1em', fill: 'currentColor', viewBox: '0 0 1024 1024'}, [
                h('path', {
                    d: 'M0 576a510.848 510.848 0 0 0 173.376 384l84.672-96a384 384 0 1 1 525.568-559.552L640.064 448h384V64l-149.952 149.952A512 512 0 0 0 0.064 576z',
                    'p-id': '2271'
                })
            ])
        ]);
    }
});

export const undoIcon: DefineComponent = defineComponent({
    name: 'UndoIcon',
    render() {
        return h('span', {role: 'img', class: 'anticon'}, [
            h('svg', {width: '1em', height: '1em', fill: 'currentColor', viewBox: '0 0 1024 1024'}, [
                h('path', {
                    d: 'M512 64a510.656 510.656 0 0 0-362.048 149.952L0 64v384h384L240.448 304.448a384 384 0 1 1 525.504 559.552l84.672 96A512 512 0 0 0 512 64z',
                    'p-id': '1866'
                })
            ])
        ]);
    }
});

export const copyIcon: DefineComponent = defineComponent({
    name: 'CopyIcon',
    render() {
        return h('span', {role: 'img', class: 'anticon'}, [
            h('svg', {width: '0.9em', height: '0.9em', fill: 'currentColor', viewBox: '0 0 1024 1024'}, [
                h('path', {
                    d: 'M720 192h-544A80.096 80.096 0 0 0 96 272v608C96 924.128 131.904 960 176 960h544c44.128 0 80-35.872 80-80v-608C800 227.904 764.128 192 720 192z m16 688c0 8.8-7.2 16-16 16h-544a16 16 0 0 1-16-16v-608a16 16 0 0 1 16-16h544a16 16 0 0 1 16 16v608z',
                    'p-id': '2356'
                }),
                h('path', {
                    d: 'M848 64h-544a32 32 0 0 0 0 64h544a16 16 0 0 1 16 16v608a32 32 0 1 0 64 0v-608C928 99.904 892.128 64 848 64z',
                    'p-id': '2357'
                }),
                h('path', {
                    d: 'M608 360H288a32 32 0 0 0 0 64h320a32 32 0 1 0 0-64zM608 520H288a32 32 0 1 0 0 64h320a32 32 0 1 0 0-64zM480 678.656H288a32 32 0 1 0 0 64h192a32 32 0 1 0 0-64z',
                    'p-id': '2358'
                })
            ])
        ]);
    }
});

export const sealIcon: DefineComponent = defineComponent({
    name: 'SealIcon',
    render() {
        return h('span', {role: 'img', class: 'anticon'}, [
            h('svg', {width: '1em', height: '1em', fill: 'currentColor', viewBox: '0 0 1024 1024'}, [
                h('path', {
                    d: 'M422.399 601.6V493.323c-79.111-34.622-134.4-113.655-134.4-205.323 0-123.711 100.54-224 224-224 123.711 0 224 100.545 224 224 0 91.814-55.379 170.725-134.4 205.313V601.6h201.472c61.925 0 112.128 49.716 112.128 112.003V825.6H108.801V713.598c0-61.855 50.444-111.998 112.126-111.998h201.472zM153.601 870.4h716.793V960H153.6v-89.6z',
                    'p-id': '30471'
                })
            ])
        ]);
    }
});

export const notifierIcon: DefineComponent = defineComponent({
    name: 'NotifierIcon',
    render() {
        return h('span', {role: 'img', class: 'anticon'}, [
            h('svg', {width: '1em', height: '1em', fill: 'currentColor', viewBox: '0 0 1024 1024'}, [
                h('path', {
                    d: 'M915.82 142.44L97.84 458.18c-46.13 17.76-44.89 43.66 2.47 57.72l197.59 58.71 80.42 239.03c10.61 31.33 37.99 37.99 61.42 14.55l103.6-102.62 204.74 149.98c26.64 19.49 54.02 9.13 61.18-23.19L958.5 179.43c7.15-32.31-11.85-48.83-42.68-36.99zM791.49 294.63l-348.8 310.81c-6.17 5.67-11.84 16.78-12.83 24.91l-15.29 144.8c-1.73 16.28-7.4 17.02-12.58 1.23L334.4 572.89c-2.71-7.89 0.99-17.76 8.14-21.95l442.54-265.42c27.87-16.78 30.83-12.84 6.41 9.11z',
                    'p-id': '10639'
                })
            ])
        ]);
    }
});

export const dealIcon: DefineComponent = defineComponent({
    name: 'DealIcon',
    render() {
        return h('span', {role: 'img', class: 'anticon'}, [
            h('svg', {width: '1em', height: '1em', fill: 'currentColor', viewBox: '0 0 1024 1024'}, [
                h('path', {
                    d: 'M170.616903 127.962678a42.654226 42.654226 0 0 0-42.654225 42.654225v674.405965a42.654226 42.654226 0 0 0 42.654225 42.654226h91.280044a42.654226 42.654226 0 1 1 0 85.308452H170.616903a127.962678 127.962678 0 0 1-127.962677-127.962678V170.616903a127.962678 127.962678 0 0 1 127.962677-127.962677h554.163703a127.962678 127.962678 0 0 1 127.962677 127.962677v93.96726a42.654226 42.654226 0 1 1-85.308451 0V170.616903a42.654226 42.654226 0 0 0-42.654226-42.654225H170.616903z',
                    'p-id': '30471'
                }),
                h('path', {
                    d: 'M213.271129 341.233807a42.654226 42.654226 0 0 1 42.654226-42.654226h310.650727a42.654226 42.654226 0 1 1 0 85.308452H255.925355a42.654226 42.654226 0 0 1-42.654226-42.654226zM213.271129 511.85071a42.654226 42.654226 0 0 1 42.654226-42.654226h134.019578a42.654226 42.654226 0 1 1 0 85.308452H255.925355a42.654226 42.654226 0 0 1-42.654226-42.654226zM796.013163 382.181864a42.057067 42.057067 0 0 1 59.971841 0l155.048111 156.924897a43.166077 43.166077 0 0 1-0.255925 60.910234l-413.447411 411.61328a42.142375 42.142375 0 0 1-29.729996 12.327071H412.551672A42.654226 42.654226 0 0 1 370.153372 981.047195v-150.057567c0-11.388678 4.436039-22.30816 12.369725-30.369809l209.986754-212.460699a42.057067 42.057067 0 0 1 59.971842 0c16.54984 16.720457 16.54984 43.933853 0 60.654309l-197.53172 199.920357v89.403257H550.239513l370.579915-368.959053-94.820344-95.972008-43.422002 43.933852 36.512017 36.93856c16.54984 16.763111 16.54984 43.933853 0 60.654309a42.057067 42.057067 0 0 1-59.971842 0l-66.455283-67.265714a43.294039 43.294039 0 0 1 0-60.696964l103.351189-104.588161z',
                    'p-id': '30472'
                })
            ])
        ]);
    }
});

export const routeIcon: DefineComponent = defineComponent({
    name: 'RouteIcon',
    render() {
        return h('span', {role: 'img', class: 'anticon'}, [
            h('svg', {
                width: '1em',
                height: '1em',
                fill: 'currentColor',
                viewBox: '0 0 1024 1024'
            }, [h('path', {
                d: 'M525.96 69.895l256.652 124.437c15.903 7.71 22.544 26.852 14.834 42.755a32 32 0 0 1-14.834 14.833L544 367.61V472c0 1.006-0.023 2.006-0.07 3H720c34.993 0 63.426 28.084 63.991 62.942L784 539v123h96c17.673 0 32 14.327 32 32v186c0 17.673-14.327 32-32 32H624c-17.673 0-32-14.327-32-32V694c0-17.673 14.327-32 32-32h96V539H304v123h96c17.673 0 32 14.327 32 32v186c0 17.673-14.327 32-32 32H144c-17.673 0-32-14.327-32-32V694c0-17.673 14.327-32 32-32h96V539c0-34.993 28.084-63.426 62.942-63.991L304 475h176V367.61L241.388 251.92c-15.903-7.71-22.544-26.852-14.834-42.755a32 32 0 0 1 14.834-14.833L498.039 69.895a32 32 0 0 1 27.922 0z',
                'p-id': '41560'
            }),
            ])
        ]);
    }
});