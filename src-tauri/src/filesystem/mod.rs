pub mod explorer;
pub mod volume;

pub const fn bytes_to_gb(bytes: u64) -> u16 {
    (bytes / (1e9 as u64)) as u16
}
