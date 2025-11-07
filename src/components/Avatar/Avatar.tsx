import './Avatar.css'

interface AvatarProps {
    src: string
    alt?: string
    size?: number
}

export default function Avatar({ src, alt = 'Avatar', size = 80 }: AvatarProps) {
    return (
        <img
            src={src}
            alt={alt}
            className="avatar"
            style={{ width: size, height: size }}
        />
    )

}