const ONLY_AUDIO = {
    video: false,
    audio: true
}

const ONLY_VIDEO = {
    video: true,
    audio: false
}

const ALL_DISABLED = {
    video: false,
    audio: false
}

const ALL_ENABLED = {
    video: true,
    audio: true
}

export default {
    ONLY_AUDIO,
    ONLY_VIDEO,
    ALL_DISABLED,
    ALL_ENABLED
};

export interface MediaDeviceInterface {
    video: boolean,
    audio: boolean
}